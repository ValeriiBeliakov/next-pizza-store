import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

export const calcTotalPizzaPrice = (
  items: ProductItem[],
  ingredients: Ingredient[],
  size: PizzaSize,
  type: PizzaType,
  selectedIngredients: number[]
) => {
  const pizzaPrice =
    items.find((item) => item.size === size && item.pizzaType === type)
      ?.price || 0;
  const ingredientsPrice = selectedIngredients.reduce(
    (acc, id) => acc + ingredients.find((i) => i.id === id)!.price || 0,
    0
  );
  return pizzaPrice + ingredientsPrice;
};
