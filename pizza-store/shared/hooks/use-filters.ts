import {  useSearchParams } from "next/navigation"
import { useSet } from "react-use";
import { useState } from "react";


interface PriceProps {
    priceFrom ?: number;
    priceTo?:number
  }
interface Filters extends PriceProps{
    pizzaTypes: string[];
    sizes: string[];
    ingredients: string[];
  }
export interface QueryFilters {
    sizes : Set<string>;
    pizzaTypes:Set<string>;
    selectedIngredients:Set<string>;
    prices:PriceProps
  }
  interface ReturnProps extends QueryFilters {
    setPrices: (name:keyof PriceProps,value:number)=>void;
    tooglePizzaTypes : (value:string)=>void;
    toogleSizes : (value:string)=>void; 
    toggleSelectedIngredients:(value:string)=>void;
  }
export const useFilters = ():ReturnProps => {
    const searchParams = useSearchParams() 
    // Ingredients filter
    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
      new Set<string>(searchParams.get('ingredients')?.split(',')),
    );
    // Size filter
    const [ sizes , {toggle:toogleSizes}] = useSet(new Set<string>(searchParams.get('sizes')?.split(',') || []));
    // Pizza type filter
    const [ pizzaTypes , {toggle:tooglePizzaTypes}] = useSet(new Set<string>(searchParams.get('pizzaTypes')?.split(',') || []));
//  Price filter
    const [prices , setPrices] = useState<PriceProps>({ 
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined
  })

    const onChangePrice = (name:keyof PriceProps,value:number)=>{
    setPrices((prev)=>({
      ...prev,
      [name]:value
    }))}
    
      
       return {sizes,pizzaTypes,selectedIngredients,prices,setPrices : onChangePrice,tooglePizzaTypes,toogleSizes,toggleSelectedIngredients:toggleIngredients}
}
