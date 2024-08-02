'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/app/store/category';

interface Props {
  className?: string;
}

const categories = ["Пиццы","Комбо","Закуска","Коктейли","Кофе",'Напитки','Десерты'];
const result = categories.map((category, index) => ({ category, id: index + 1 }));

export const Categories: React.FC<Props>=({className})=>{
  const categoryActiveId = useCategoryStore(state=>state.activeId);
 return (
<div className={cn("inline-flex  gap-1 bg-gray-50 p-1 rounded-2xl",className)}>
  {result.map(({category,id},index)=>(
    <a className={cn('flex items-center font-bold h-11 rounded-2xl px-5' ,
    categoryActiveId===id && "bg-white shadow-gray-200 text-primary",
    )} href={`/#${category}`} key={index}>
      <button>{category}</button>
    </a>
  ))}
</div>
)
}