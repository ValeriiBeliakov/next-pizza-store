import React from 'react';
import { cn } from '@/shared/lib/utils';

import { getCartItemDetails } from '@/shared/lib/get-cart-item-details';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { WhiteBlock } from '../white-block';
import { CheckoutItem } from '../checkout-item';

import { CheckoutItemSkeleton } from '../checkout-item-skeleton';

interface Props {
    className?: string;
    items:CartStateItem[];
    onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
    onDelete: (id: number) => void;
    loading?: boolean;
}

export const CheckoutCart: React.FC<Props> = ({ className,items,onClickCountButton,onDelete,loading }) => {
    return (
        <div className={className}>
            <WhiteBlock title="1. Корзина">
                {
                    loading && items.length === 0 && [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} className="h-10 mb-2" />)
                }
                {items.map((item) => (
                    <CheckoutItem key={item.id} {...item} imageUrl={item.imageUrl} onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)} details={item.pizzaSize && item.pizzaType
                        ? getCartItemDetails(
                            item.ingredients,
                            item.pizzaType as PizzaType,
                            item.pizzaSize as PizzaSize
                        )
                        : ""} onClickRemove={() => onDelete(item.id)} />
                ))}
            </WhiteBlock>
        </div>
    )
}