import React from 'react';


interface Props {
    code: string;
    className?: string;
}

export const VerificationUserTemplate: React.FC<Props>=({code,className})=>{
 return (
<div className={className}>
        <p>Код подтверждения : <h2>{code}</h2></p>
        <p><a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Подтвердить регистпацию</a></p>
</div>
)
}