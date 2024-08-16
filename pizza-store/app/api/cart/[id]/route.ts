import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH( req: NextRequest,{params} : {params:{id:string}}){
 try {
    const id = Number(params.id);
    const data = (await req.json()) as {quantity:number};
    const token = req.cookies.get('cartToken')?.value;
    if(!token) {
        return NextResponse.json({error:'Токен корзины не найден'},{status:404})
    }
    const cartItem = await prisma.cartItem.findFirst({
        where:{
            id
        }
    })
    if(!cartItem) {
        return NextResponse.json({error:'Товар не найден'},{status:404})
    }
    await prisma.cartItem.update({
        where:{
            id,
        },
        data:{
            quantity:data.quantity
        }
    })
    const updateUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updateUserCart);
 } catch (error) {
    console.log({message:'[CART_PATCH] Server error'},error);
    return NextResponse.json({message:'не удалось обновить корзину'},{status:500})
 }
}

export async function DELETE(req: NextRequest,{params} : {params:{id:string}}){
    try {
        const id = Number(params.id);
        const token = req.cookies.get('cartToken')?.value;
        if(!token) {
            return NextResponse.json({error:'Токен корзины не найден'},{status:404})
        }
        const cartItem = await prisma.cartItem.findFirst({
            where:{
                id
            }
        })
        if(!cartItem) {
            return NextResponse.json({error:'Товар не найден'},{status:404})
        }
        await prisma.cartItem.delete({
            where:{
                id
            }
        })
        const updateUserCart = await updateCartTotalAmount(token);
        return NextResponse.json(updateUserCart);
    } catch (error) {
        console.log({message:'[CART_DELETE] Server error'},error);
        return NextResponse.json({message:'не удалось удалить корзину'},{status:500})
    }
}