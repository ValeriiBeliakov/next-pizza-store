
import z from 'zod';
export const checkoutFormSchema = z.object({
    firstName:z.string().min(2,{message:"Имя не может быть меньше 2 символов"}),
    lastName:z.string().min(2,{message:"Фамилия не может быть меньше 2 символов"}),
    email:z.string().email({message:"Некорректная почта"}),
    phone:z.string().min(10,{message:"Некорректный телефон"}),
    address:z.string().min(5,{message:"Адрес не может быть меньше 10 символов"}),
    comment:z.string().optional()
})
export type CheckoutFormData= z.infer<typeof checkoutFormSchema>