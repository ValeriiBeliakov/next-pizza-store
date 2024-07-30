import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';
import Image from 'next/image';
import pizza from "../../app/images/icons/pizza.svg"
import { Button } from '../ui';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';


interface Props {
  className?: string;
}

export const Header: React.FC<Props>=({className})=>{
 return (
<header className={cn('border border-b',className)}>
      <Container className='flex items-center justify-between py-8'>
     {/* left side */}
    <div className='flex gap-2'>
    <Image src={pizza} alt="pizza" width={35} height={35}/>
    <div>
        <h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
        <p className='text-sm text-gray-400 leading-3'>вкуснее уже некуда</p>
    </div>
    </div>
    {/* right side */}
    <div className='flex items-center gap-3'>
        <Button variant='outline' className='flex gap-2 items-center'>
            <User size={16}/>
            Войти
        </Button>
        <div>
            <Button className='group relative'>
                <b>0</b>
                <span className='h-full w-[1px] bg-white/30 mx-3'></span>
                <div className='flex items-center gap-1 transition duration-300  group-hover:opacity-0'>
                    <ShoppingCart className='relative' size={16} strokeWidth={2}/>
                    <b>0</b>
                </div>
                <ArrowRight className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'/>
            </Button>
        </div>
    </div>
      </Container>
</header>
)
}