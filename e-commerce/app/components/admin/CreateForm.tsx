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
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import { toast } from 'react-hot-toast';
import axios from "axios";
import { useRouter } from 'next/navigation';




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
    const [uploadedImg, setUploadedImg] = useState<string | null>(null);
    const router = useRouter();

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
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log("data", data)
        //! eger submit ettikten sonra resetlemek istersek react-hook-formun ozelligini kullanabiliriz

        const handleChange = async () => {
            toast.success('Yukleme islemi basarili')
            try {
                const storage = getStorage(firebaseApp);
                const storageRef = ref(storage, 'images/shop.jpg');
                const uploadTask = uploadBytesResumable(storageRef, img);


                await new Promise<void>((resolve, reject) => {
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            // Observe state change events such as progress, pause, and resume
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                            switch (snapshot.state) {
                                case 'paused':
                                    console.log('Upload is paused');
                                    break;
                                case 'running':
                                    console.log('Upload is running');
                                    break;
                            }
                        },
                        (error) => {
                            reject(error)
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                console.log('File available at', downloadURL);
                                setUploadedImg(downloadURL);
                                resolve();
                            });
                        }
                    );

                })




            } catch (error) {
                console.log(error)
            }
        }
        await handleChange();
        let newData = { ...data, image: uploadedImg }

        axios.post('/api/product', newData)
            .then(() => {
                toast.success("Urun Ekleme Basarili");
                router.refresh();
            }).catch((error) => {
                console.log(error)
            })

        console.log(newData, "newdataaaa")
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
            <input type="file" className="my-2" onChange={onChangeFunc} />
            <Button text="Ürün Oluştur" onClick={handleSubmit(onSubmit)} />
        </div>
    );
};

export default CreateForm;
