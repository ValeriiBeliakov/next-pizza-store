import { useEffect } from "react";
import { useCartStore } from "../store/cart";

export const useCarts = () => {
    const [fetchItems, totalAmount, items, updateQuantity, removeCartItem,loading] =
        useCartStore((state) => [
            state.fetchCartItems,
            state.totalAmount,
            state.items,
            state.updateItemQuantity,
            state.removeCartItem,
            state.loading
        ]);
    useEffect(() => {
        fetchItems();
    }, []);
    const onClickCountButton = (
        id: number,
        quantity: number,
        type: "plus" | "minus"
    ) => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
        updateQuantity(id, newQuantity);
    };
    const onDelete = (id: number) => {
        removeCartItem(id);
    };
    return {
        onClickCountButton,
        onDelete, fetchItems,
        totalAmount, items,
        loading
    }
}