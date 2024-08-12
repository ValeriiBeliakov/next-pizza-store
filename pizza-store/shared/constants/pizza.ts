const mapSize={
    20:'Маленькая',
    30:'Средняя',
    40:'Большая'
} as const;

export const mapPizzaType = {
    1 : 'традиционная',
    2 : 'тонкое'
} as const;

export const pizzaSizes = Object.entries(mapSize).map(([value,name])=>({
   name,
   value
}))
export const pizzaTypes = Object.entries(mapPizzaType).map(([value,name])=>({
    name,
    value
 }))

export type PizzaType = keyof typeof mapPizzaType;
export type PizzaSize = keyof typeof mapSize