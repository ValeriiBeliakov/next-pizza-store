'use client';

import { Container, Title } from "@/shared/components/shared";
import { useCarts } from "@/shared/hooks/use-carts";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutAddress, CheckoutCart, CheckoutPersonalData, CheckoutSidebar } from "@/shared/components/shared/checkout";
import { CheckoutFormData, checkoutFormSchema } from "@/shared/components/shared/checkout/checkout-form-schema";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useState } from "react";



export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
  const { items, totalAmount, onClickCountButton, onDelete, loading } = useCarts();
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
  const Tax = 20;
  const DeliveryPrice = 150;
  const total = totalAmount + Tax + DeliveryPrice;
  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    try {
      setSubmitting(true);
      const url = createOrder(data);
      toast.success('Заказ оформлен, переход на оплату', { icon: '✅' })
      if (url) {
        location.href = url;
      }

    } catch (error) {
      setSubmitting(false)
      console.log(error)
      toast.error('Не удалось оформить заказ', {
        icon: '❌'
      })
    } finally {
      setSubmitting(false)
    }
    createOrder(data);
  }
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
            <CheckoutSidebar totalAmount={total} loading={loading || submitting} />
          </div>
        </div>
      </form>
    </FormProvider>

  </Container>
}