"use client";

import { Ingredient, ProductItem } from "@prisma/client";
import { Button } from "../ui";
import {
  PizzaSize,
  PizzaType,
  pizzaTypes,
} from "@/shared/constants/pizza";
import { IngredientItem, PizzaImage, Title, GroupVariants } from "./index";
import { usePizzaSize } from "@/shared/hooks/use-pizza-size";
import { useDetails } from "@/shared/hooks/use-details";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
 
 
  const {type,size,setSize,setType,availableSizes,selectedIngredients,onClickActive,currentItemId} = usePizzaSize(items);
  const {totalPrice,textDetaills} = useDetails(size,type,selectedIngredients,items,ingredients);
  const handleClickAdd = () => {
    if(currentItemId){
    onSubmit(currentItemId, selectedIngredients);
    }
    console.log({ size, type, selectedIngredients });
  };
 
 
  return (
    <div className={"flex flex-1"}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetaills}</p>
        <div className="flex flex-col gap-5 mt-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>
        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                active={selectedIngredients.includes(ingredient.id)}
                onClick={() => onClickActive(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={handleClickAdd}
          loading={loading}

        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
