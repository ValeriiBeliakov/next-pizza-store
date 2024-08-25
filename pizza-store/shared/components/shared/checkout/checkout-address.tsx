'use client';
import React from 'react';
import { AdressInput } from '../address-input';
import { FormTextarea } from '../form-components';
import { WhiteBlock } from '../white-block';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';


interface Props {
    className?: string;
}

export const CheckoutAddress: React.FC<Props> = ({ className }) => {
    const {control} = useFormContext();
    return (
       
            <WhiteBlock title="3. Адрес доставки" className={className}>
                <div className="flex flex-col gap-5 ">

                    <Controller
                    name='address'
                    control={control}
                    render={({field,fieldState})=><><AdressInput onChange={field.onChange}/>
                    {fieldState.error?.message && <ErrorText text={fieldState.error.message} /> }
                    </>
                } 
                    
                    />
                    <FormTextarea
                        className="text-base"
                        placeholder="комментарии к заказу"
                        rows={5}
                        name='comment'
                    />
                </div>
            </WhiteBlock>
        
    )
}