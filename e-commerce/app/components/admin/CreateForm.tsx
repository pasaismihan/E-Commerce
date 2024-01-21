"use client";

import Heading from "../general/Heading";
import Input from '../general/Input';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import Checkbox from "../general/Checkbox";
import { FaComputer } from "react-icons/fa6";
import { GiSonicShoes } from "react-icons/gi";
import { FaTabletAlt } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { FaKeyboard } from "react-icons/fa";
import { FaMouse } from "react-icons/fa";
import ChoiceInput from "../general/ChoiceInput";
import Button from '../general/Button';
import { useState } from "react";

const categoryList = [
    {
        name: "Bilgisayar",
        icon: FaComputer
    },
    {
        name: "Ayakkabi",
        icon: GiSonicShoes

    },
    {
        name: "Tablet",
        icon: FaTabletAlt

    },
    {
        name: "Mikrofon",
        icon: FaMicrophone

    },
    {
        name: "Klavye",
        icon: FaKeyboard

    },
    {
        name: "Fare",
        icon: FaMouse

    },

]

const CreateForm = () => {

    const [img, setImg] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            description: "",
            brand: "",
            category: "",
            price: "",
            image: "",
            inStock: false
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log("data", data)
    }

    const category = watch('category') // category icerisindeki degisiklikleri izleyebilmemiz icin watch kullandik 
    const setCostumValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => { //file yuklemek icin kullandigimiz fonksiyon
        if (e.target.files && e.target.files.length > 0) {
            setImg(e.target.files[0])
        }
    }


    return (
        <div className="w-2/3">
            <Heading text="Ürün Oluştur" center />
            <Input
                placeholder="Ad"
                type="text"
                id="name"
                register={register}
                errors={errors}
                required
            />
            <Input
                placeholder="Açıklama"
                type="text"
                id="description"
                register={register}
                errors={errors}
                required
            />
            <Input
                placeholder="Marka"
                type="text"
                id="brand"
                register={register}
                errors={errors}
                required
            />
            <Input
                placeholder="Fiyat"
                type="number"
                id="price"
                register={register}
                errors={errors}
                required
            />
            <Checkbox
                id="inStock"
                register={register}
                label="Ürünü Stokta Mevcut mu ?"
            />
            <div className="flex flex-wrap gap-4 mt-2">
                {categoryList.map(cat => (
                    <ChoiceInput key={cat.name} text={cat.name} icon={cat.icon} onClick={(category) => setCostumValue("category", category)} selected={category == cat.name} />
                ))}
            </div>
            <Button text="Ürün Oluştur" onClick={handleSubmit(onSubmit)} />
        </div>
    );
};

export default CreateForm;
