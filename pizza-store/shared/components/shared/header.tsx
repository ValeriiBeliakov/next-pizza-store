'use client';

import React, { useEffect, useState } from "react";
import { Container } from "./container";
import Image from "next/image";
import pizza from "../../../app/images/icons/pizza.svg";
import Link from "next/link";
import { AuthModal, CartButton, ProfileButton, SearchInput } from "./index";
import { cn } from "@/shared/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";



interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header: React.FC<Props> = ({
  className,
  hasSearch = true,
  hasCart = true,
}) => {
  const router = useRouter();
  const [open,setOpen] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    if(searchParams.has('verify')){
      router.replace('/')
      setTimeout(() => toast.success('Почта успешно подтверждена'), 500)
    }
    
  },[])

 
  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* left side */}
        <Link href="/">
          <div className="flex gap-2">
            <Image src={pizza} alt="pizza" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Pizza Clone</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкуснее уже некуда
              </p>
            </div>
          </div>
        </Link>
        {hasSearch && (
          <div className="mx-10 flex-1 ">
            <SearchInput />
          </div>
        )}
        {/* right side */}
        <div className="flex items-center gap-3">
          <AuthModal open={open} onClose={()=>setOpen(false)}/>
          <ProfileButton onClickSignIn={()=>setOpen(true)}/>
          {hasCart && (
            <div>
              <CartButton />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};
