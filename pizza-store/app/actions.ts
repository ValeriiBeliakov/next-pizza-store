"use server";

import { hashSync } from 'bcrypt';
import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormData } from "@/shared/components/shared/checkout/checkout-form-schema";

import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { SendEmail } from "@/shared/lib/send-email";
import { PayOrderTemplate } from "@/shared/components/shared";
import { createPayment } from "@/shared/lib/create-payment";
import { getUserSession } from "@/shared/lib/get-user-session";
import { VerificationUserTemplate } from '@/shared/components/shared/email-templates/verification-user';


// Server Actions - чтобы доделать функционал с корзиной нужно сделать ип или самозанятость на u kassa - пока без функционалла
export async function createOrder(data: CheckoutFormData) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;
    if (!cartToken) {
      throw new Error("Токен корзины не найден");
    }
    /* Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
      where: {
        token: cartToken,
      },
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    /* Если корзина не найдена возращаем ошибку */
    if (!userCart) {
      throw new Error("Cart not found");
    }

    /* Если корзина пустая возращаем ошибку */
    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    /* Создаем заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });
    // Очистка корзины
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });
    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: "Оплата заказа #" + order.id,
    });
    if(!paymentData){
      throw new Error('Payment data not found')
    }
    await prisma.order.update({
      where:{
        id:order.id
      },
      data:{
        paymentId:paymentData.id
      }
    })

     const paymentUrl = paymentData.confirmation.confirmation_url;
    await SendEmail(
      data.email,
      "Next Pizza / Оплатите заказ #" + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      })
    );
  } catch (error) {
    console.log("[createOrder] Server error", error);
  }
}
export async function updateUserInfo(body:Prisma.UserUpdateInput){
  try {
    const currentUser =await getUserSession();
    if(!currentUser){
      throw new Error('User not found')}
      await prisma.user.update({
        where: {
          id: Number(currentUser.id)
        },
        data: {
          fullName: body.fullName,
          email: body.email,
          password: body.password ? hashSync(body.password as string, 10) : undefined,
        }
      })
     
  } catch (error) {
    console.log("Error while updating user info",error)
    throw error;    
  }
}
export async function registerUser(body:Prisma.UserCreateInput){
  try {
    const user = await prisma.user.findFirst({
      where:{
        email:body.email
      }
    })
    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }
    const newUser = await prisma.user.create({
      data:{
        fullName:body.fullName,
        email:body.email,
        password:hashSync(body.password,10),
        verified:new Date(),
      }
    })
    if(!newUser){
      throw new Error('Не удалось создать пользователя')
    }
    // const code = Math.floor(100000 + Math.random() * 900000).toString();
    // await prisma.verificationCode.create({
    //   data: {
    //     code,
    //     userId: newUser.id,
    //   },
    // });
    // await SendEmail(
    //   newUser.email,
    //   'Next Pizza / 📝 Подтверждение регистрации',
    //   VerificationUserTemplate({
    //     code,
    //   }),
    // );

  }
  catch (error) {
    console.log("Error while registering user",error)
    throw error;
  }
}