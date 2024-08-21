import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form-components';




interface Props {
    className?: string;
}

export const CheckoutPersonalData: React.FC<Props> = ({ className }) => {
    return (
            <WhiteBlock title="2. Персональные данные" className={className}>
                <div className="grid grid-cols-2 gap-5">
                    <FormInput placeholder="Имя" name="firstName" className="text-base" />
                    <FormInput placeholder="Фамилия" name="lastName" className="text-base" />
                    <FormInput placeholder="Email" name="email" className="text-base" />
                    <FormInput placeholder="Телефон" name="phone" className="text-base" />
                </div>
            </WhiteBlock>
       
    )
}