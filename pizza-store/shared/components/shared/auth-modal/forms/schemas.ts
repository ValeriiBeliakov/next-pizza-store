import { z } from "zod";

const passwordSchema = z.string().min(5, { message: "Пароль должен быть не меньше 5 символов" })
export const formLoginSchema = z.object({
    email: z.string().email({ message: "Некорректная почта" }),
    password: passwordSchema,
})
export const formRegisterSchema = formLoginSchema.merge(z.object({
    fullName: z.string().min(2, { message: "Введите имя и фамилию" }),
    confirmPassword: passwordSchema,
})).refine(data => data.password === data.confirmPassword, { message: "Пароли не совпадают", path: ["confirmPassword"] })


export type TFormLoginValues = z.infer<typeof formLoginSchema>
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>