"use client";
import React, { useState } from "react";
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
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import Image from "next/image";
import empty_box from "@/app/images/empty-box.png";
import { Title } from "./title";
import { useCarts } from "@/shared/hooks/use-carts";
interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  const {items,totalAmount,onClickCountButton,onDelete}= useCarts();
  const [redirection,setRedirection] = useState(false);
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
          {totalAmount > 0 ? (
            <SheetHeader>
              <SheetTitle>
                в корзине{" "}
                <span className="font-bold"> {items.length} товаров</span>
              </SheetTitle>
            </SheetHeader>
          ) : null}
          {
            totalAmount === 0 &&  (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center justify-center flex-col">
                <Image src={empty_box} alt="cart is empty"></Image>
                <Title size="sm" text="Корзина пустая" className="text-center font-bold my-2" />
              <p className="text-center text-neutral-500 mb-5">
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
              </p>

              <SheetClose>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>

              </div>
              </div>
            )
          }
          {/* Items */}
          <div className="-mx-6 mt-5 overflow-auto flex-1">
            {items.map((item) => (
              <>
                <div className="mb-2">
                  <CartDrawerItem
                    id={item.id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    price={item.price}
                    disabled={item.disabled}
                    quantity={item.quantity}
                    onClickCountButton={(type) =>
                      onClickCountButton(item.id, item.quantity, type)
                    }
                    onDelete={() => onDelete(item.id)}
                    details={
                      item.pizzaSize && item.pizzaType
                        ? getCartItemDetails(
                            item.ingredients,
                            item.pizzaType as PizzaType,
                            item.pizzaSize as PizzaSize
                          )
                        : ""
                    }
                  />
                </div>
              </>
            ))}
          </div>
          {totalAmount ? (
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
                  <Button type="submit" onClick={() => setRedirection(true)} disabled={redirection} className="w-full h-12 text-base">
                    Оформить заказ
                    <ArrowRight className="w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          ) : null}
          
        </SheetContent>
      </Sheet>
    </div>
  );
};
