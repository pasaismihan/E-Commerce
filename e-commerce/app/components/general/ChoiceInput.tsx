import React from 'react'
import { IconType } from 'react-icons';

type ChoiceInputProps = {
    text: string;
    icon: IconType;
    selected?: boolean;
    onClick: (value: string) => void
}


const ChoiceInput: React.FC<ChoiceInputProps> = ({ text, icon: Icon, selected, onClick }) => {
    return (
        <div onClick={() => onClick(text)} className={`my-3 cursor-pointer py-2 px-4 flex rounded-md items-center justify-center gap-2 border h-16 ${selected ? 'border-black' : 'border-gray-200'}`}>
            <Icon />
            <span className='text-slate-700 text-lg'>{text}</span>
        </div>
    )
}

export default ChoiceInput