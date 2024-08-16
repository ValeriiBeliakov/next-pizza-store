'use client';


import React from 'react';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/shared/store/cart';
import { ProductWithAdditionalInfo } from '@/@types/prisma';

interface Props {
  product: ProductWithAdditionalInfo;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
  const [addProduct,loading] = useCartStore((state) => [state.addCartItem,state.loading]);
  const router = useRouter();

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onAddProduct = async () => {
    try {
      await addProduct({
        productItemId: firstItem.id,
      });
      toast.success(`позиция ${product.name} добавлена в корзину`);
      _onSubmit?.();
    } catch (error) {
      console.log(error)
      toast.error("не удалось добавить продукт");
    }
  };
  const onAddPizza = async (productItemId: number, ingredients: number[]) => {
    try {
      await addProduct({ productItemId, ingredients });
      toast.success(`${product.name} добавлена в корзину`);
      router.back()
    } catch (e) {
      toast.error("не удалось добавить пиццу");
      console.error(e);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onAddPizza}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onClickAddCart={onAddProduct}
      price={firstItem.price}
      loading={loading}
    />
  );
};
