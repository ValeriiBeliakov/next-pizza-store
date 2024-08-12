import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { calcTotalPizzaPrice } from "../lib/calc-total-pizza-price";

export const useDetails = (size:PizzaSize,type:PizzaType,selectedIngredients:number[],items:ProductItem[],ingredients:Ingredient[]) => {
     
  const textDetaills = `${size}см, ${
    type === 1 ? "традиционное" : "тонкое"
  } тесто, ${selectedIngredients.length} ${
    selectedIngredients.length === 1 ? "ингредиент" : "ингредиента"
  }`;
  
  const totalPrice = calcTotalPizzaPrice(
    items,
    ingredients,
    size,
    type,
    selectedIngredients
  );
  return {totalPrice,textDetaills};
}