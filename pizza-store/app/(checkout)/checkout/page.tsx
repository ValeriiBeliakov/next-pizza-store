'use client';

import { Container, Title } from "@/shared/components/shared";
import { useCarts } from "@/shared/hooks/use-carts";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutAddress, CheckoutCart, CheckoutPersonalData, CheckoutSidebar } from "@/shared/components/shared/checkout";
import { CheckoutFormData, checkoutFormSchema } from "@/shared/components/shared/checkout/checkout-form-schema";
// import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";



export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
  const { items, totalAmount, onClickCountButton, onDelete, loading } = useCarts();
  const {data:session} = useSession();
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: ''
    }
  })
  useEffect(() => {
    async function fetchUserInfo(){
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(' ');
      form.setValue('firstName',firstName);
      form.setValue('lastName',lastName);
      form.setValue('email',data.email);
    }
    if(session){
   fetchUserInfo()
    }
  },[])
  const onSubmit:SubmitHandler<CheckoutFormData> = async (data: CheckoutFormData) => {
    try {
      setSubmitting(true);

      // const url = await createOrder(data);

      toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      });
// if(url){
//   location.href = url;
// }
     
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
  };

  return <Container className="mt-10">
    <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-10">
          {/* Left side */}
          <div className="flex flex-col gap-10 flex-1 mb-20">
            <CheckoutCart items={items} onClickCountButton={onClickCountButton} onDelete={onDelete} loading={loading} />
            <CheckoutPersonalData className={loading ? 'opacity-50 pointer-events-none' : ''} />
            <CheckoutAddress className={loading ? 'opacity-50 pointer-events-none' : ''} />
          </div>
          {/* Right side */}
          <div className="w-[450px]">
            <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
          </div>
        </div>
      </form>
    </FormProvider>

  </Container>
}