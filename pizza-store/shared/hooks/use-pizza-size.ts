import { useEffect, useState } from "react";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { ProductItem } from "@prisma/client";
import { getAvailablePizzaSizes } from "../lib/get-available-pizza-sizes";
import { Variant } from "../components/shared/group-variants";


interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  setSize:(size:PizzaSize)=>void;
  setType:(type:PizzaType)=>void;
  selectedIngredients: Array<number>;
  onClickActive: (id: number) => void;
  currentItemId?:number
  availableSizes: Variant[]
}
export const usePizzaSize = (items:ProductItem[]):ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, setSelectesIngredients] = useState<Array<number>>(
    []
  );

  const availableSizes = getAvailablePizzaSizes(items, type);
  const currentItemId = items.find((item) => item.size === size && item.pizzaType === type)?.id;
  const onClickActive = (id: number) =>
    setSelectesIngredients(
      selectedIngredients.includes(id)
        ? selectedIngredients.filter((i) => i !== id)
        : [...selectedIngredients, id]
    );
    useEffect(() => {
        const currentSize = availableSizes?.find(
          (item) => Number(item.value) === Number(size) && !item.disabled
        );
        if (currentSize) {
          setSize(Number(currentSize.value) as PizzaSize);
        } else {
          const availableSize = availableSizes.find((item) => !item.disabled);
          if (availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
          }
        }
      }, [availableSizes,size]);
      return {
        size,
        type,
        setSize,
        setType,
        selectedIngredients,
        onClickActive,
        availableSizes,
        currentItemId
      }
}