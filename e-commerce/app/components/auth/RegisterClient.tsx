"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import AuthContainer from "../containers/AuthContainer";
import Button from "../general/Button";
import Heading from "../general/Heading";
import Input from "../general/Input";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterClient = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios.post("/api/register", data).then(() => {
      toast.success("Kullanici Olusturuldu");
      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok) {
          router.push("/cart");
          router.refresh();
          toast.success("register islemi basarili");
        }
        if (callback?.error) {
          toast.error(callback.error);
        }
      });
    });
  };
  return (
    <AuthContainer>
      <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
        <Heading text="Register" center />
        <Input
          placeholder="Ad"
          type="text"
          id="name"
          register={register}
          errors={errors}
          required
        />
        <Input
          placeholder="Email"
          type="text"
          id="email"
          register={register}
          errors={errors}
          required
        />
        <Input
          placeholder="Parola"
          type="password"
          id="password"
          register={register}
          errors={errors}
          required
        />
        <Button text="Kayit Ol" onClick={handleSubmit(onSubmit)} />
        <div className="mt-2 text-center text-sm">
          Daha Once Kaydin Var ise Giris Yapmak Icin{" "}
          <Link className="underline font-semibold" href="/login">
            Buraya tikla
          </Link>
        </div>
        <div className="text-center my-2 font-bold">OR</div>
        <Button
          text="Google ile Uye Ol"
          icon={FaGoogle}
          outline
          onClick={() => {}}
        />
      </div>
    </AuthContainer>
  );
};

export default RegisterClient;
