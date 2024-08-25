import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import React from 'react';


interface Props {
  orderId:number;
  items:CartItemDTO[]
}

export const SucessOrderTemplate: React.FC<Props>=({orderId,items})=>{
 return (
<div>
    <h1>Спасибо за покупку</h1>
    <p>Ваш заказ #{orderId} оплачен</p>
    <ul>
        {items.map((item)=>{
            return <li key={item.id}>{item.productItem.product.name} | {item.productItem.price} ₽ x {item.quantity} шт. = 
            {item.productItem.price * item.quantity} ₽</li>
        })}
    </ul>
</div>
)
}