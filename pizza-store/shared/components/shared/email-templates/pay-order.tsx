import React from 'react';


interface Props {
  orderId:number;
  className?: string;
  paymentUrl:string
  totalAmount:number
}

export const PayOrderTemplate: React.FC<Props>=({orderId,totalAmount,paymentUrl,className})=>{
 return (
<div className={className}>
    <h1>Заказ #{orderId}</h1>
    <p>Оплатите заказ на сумму {totalAmount} ₽. Перейдите  <a href={paymentUrl}>по ссылке ссылке</a> для оплаты заказа</p>
</div>
)
}