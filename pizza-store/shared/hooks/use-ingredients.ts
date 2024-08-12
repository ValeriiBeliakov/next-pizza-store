import { Api } from "../services/api-client"; 
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";


interface Props {
    items: Ingredient[];
    loading:boolean;
}
export const useIngredients = ():Props=>{
    const [items ,setItems] = useState<Ingredient[]>([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        async function getIngredients() {
            try {
                setLoading(true)
                const ingredients = await Api.ingredients.getAll();
                setItems(ingredients);
            } catch (error) {
                console.log(error)
            } finally{
                setLoading(false)
            }
        }
        getIngredients()
    }, [])
    return {items,loading}
}