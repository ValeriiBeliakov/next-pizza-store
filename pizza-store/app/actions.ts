

'use server'

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormData } from "@/shared/components/shared/checkout/checkout-form-schema";

import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function  createOrder(data:CheckoutFormData){
    try {
        const cookieStore = cookies();
        const cartToken = cookieStore.get('cartToken')?.value;
        if(!cartToken){
            throw new Error('Токен корзины не найден');
        }
        /* Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
        where: {
            token:cartToken
        },
        include:{
            user:true,
            items:{
                include:{
                    ingredients:true,
                    productItem:{
                        include:{
                            product:true
                        }
                    }
                }
            }
        }
       
      });
  
      /* Если корзина не найдена возращаем ошибку */
      if (!userCart) {
        throw new Error('Cart not found');
      }
  
      /* Если корзина пустая возращаем ошибку */
      if (userCart?.totalAmount === 0) {
        throw new Error('Cart is empty');
      }
  
      /* Создаем заказ */
      const order = await prisma.order.create({
        data: {
          token: cartToken,
          fullName: data.firstName + ' ' + data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          comment: data.comment,
          totalAmount: userCart.totalAmount,
          status: OrderStatus.PENDING,
          items: JSON.stringify(userCart.items),
        },
      });
      await prisma.cartItem.deleteMany({
        where:{
          id:userCart.id
        } 
      })
    } catch (error) {
        
    }
  
}