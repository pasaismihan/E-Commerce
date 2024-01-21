import React from 'react'
import { UseFormRegister } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';

type CheckboxProps = {
    id: string;
    register: UseFormRegister<FieldValues>;
    label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, register, label }) => {
    return (
        <div className='flex items-center gap-2 my-2'>
            <input type="checkbox" {...register(id)} />
            <label className='text-sm text-slate-600' htmlFor={id}>{label}</label>
        </div>
    )
}

export default Checkbox