import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, TFormLoginValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '../../title';
import { FormInput } from '../../form-components';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import image from "@/app/images/phone-icon.png"
import Image from 'next/image';


interface Props {
    onClose?: () => void;
    className?: string;
}

export const LoginForm: React.FC<Props> = ({onClose, className }) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema), defaultValues: {
            email: '',
            password: ''
        }
    });
 async function onSubmit(data:TFormLoginValues){
    try {
        const resp = await signIn('credentials', {
            ...data,
            redirect: false
        })
        if(!resp?.ok){
            toast.error("Не удалось войти в аккаунт",{icon: '🚨'})
        } else{
            toast.success("Вы вошли в аккаунт",{icon: '🚀'})
            onClose?.()
        }
    } catch (error) {
        console.log('Error login',error)    
        toast.error("Не удалось войти в аккаунт",{icon: '🚨'})
    }

 }
    return  <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
          </div>
          <Image src={image} alt="phone-icon" width={60} height={60} />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Войти
        </Button>
      </form>
    </FormProvider>
    
}