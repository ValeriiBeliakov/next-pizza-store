"use client";
import React, { useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { Button } from "../ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details";
import { useCartStore } from "@/shared/store/cart";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  const [fetchItems,totalAmount,items,updateQuantity,removeCartItem] =  useCartStore(state=>[state.fetchCartItems,state.totalAmount,state.items,state.updateItemQuantity,state.removeCartItem]);
  useEffect(()=>{
 fetchItems()
  },[])
  const onClickCountButton = (id:number,quantity:number,type:'plus'|'minus') => {
  const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateQuantity(id,newQuantity);
  };
  const onDelete = (id:number) => {
    removeCartItem(id);
  }
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
          <SheetHeader>
            <SheetTitle>
              в корзине <span className="font-bold"> {items.length} товаров</span>
            </SheetTitle>
          </SheetHeader>
          {/* Items */}
          <div className="-mx-6 mt-5 overflow-auto flex-1">
            {items.map(item=>(
              <>
              <div className="mb-2">
              <CartDrawerItem
                id={item.id}
                imageUrl={
                  item.imageUrl
                }
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type)=>onClickCountButton(item.id,item.quantity,type)}
                onDelete={()=>onDelete(item.id)}
                details={item.pizzaSize && item.pizzaType ? getCartItemDetails(item.ingredients,item.pizzaType as PizzaType,item.pizzaSize as PizzaSize,) : ''}
              />
            </div>
            </>
            ))}
            
          </div>
          <SheetFooter className="mx-6 bg-white p-8">
            <div className="w-full">
              <div className="flex mb-4">
                <span className="flex flex-1 text-lg text-neutral-500">
                  Итого
                  <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                </span>

                <span className="font-bold text-lg">{totalAmount} ₽</span>
              </div>
              <Link href="/checkout">
                <Button type="submit" className="w-full h-12 text-base">
                  Оформить заказ
                  <ArrowRight className="w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
