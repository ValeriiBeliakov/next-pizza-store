import { CartItemDTO } from "../services/dto/cart.dto";

export const calcTotalAmountPrice = (item:CartItemDTO):number=>{
    const ingredientsPrise = item.ingredients.reduce((acc,ingredient) => acc + ingredient.price,0)
  return  (ingredientsPrise + item.productItem.price) * item.quantity;
}