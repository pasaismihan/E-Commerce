"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import AuthContainer from "../containers/AuthContainer";
import Button from "../general/Button";
import Heading from "../general/Heading";
import Input from "../general/Input";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { User } from "@prisma/client";
import { useEffect } from "react";

type LoginClientProps = {
  currentUser: User | null | undefined;
};

const LoginClient: React.FC<LoginClientProps> = ({ currentUser }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Login islemi basarili");
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  //! Eger nextjs projesinde use client kullanmiyorsak useEffect hata verecektir cunku server side icin gecerli degil clientin render edilmesiyle ilgili
  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);

  return (
    <AuthContainer>
      <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
        <Heading text="Login" center />

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
        <Button text="Giris Yap" onClick={handleSubmit(onSubmit)} />
        <div className="mt-2 text-center text-sm">
          Daha Once Kayit Olmadiysan{" "}
          <Link className="underline font-semibold" href="/register">
            Buraya tikla
          </Link>
        </div>
        <div className="text-center my-2 font-bold">OR</div>
        <Button
          text="Google Ile Giris Yap"
          icon={FaGoogle}
          outline
          onClick={() => signIn("google")}
        />
      </div>
    </AuthContainer>
  );
};

export default LoginClient;
