import { Ingredient, Product, ProductItem } from "@prisma/client";

export type ProductWithAdditionalInfo = Product & {items: ProductItem[],ingredients: Ingredient[]};