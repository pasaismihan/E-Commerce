"use client"
import UseCart from "@/hooks/UseCart";
import { useRouter } from "next/navigation";
import { GiBasketballBasket } from "react-icons/gi";
const CardCount = () => {
    const { cartPrdcts } = UseCart();
    const router = useRouter();
    return (
        <div onClick={() => router.push("/cart")} className="hidden md:flex cursor-pointer">
            <GiBasketballBasket size="38" />
            <div className="font-semibold">{cartPrdcts?.length}</div>
        </div>
    )
}

export default CardCount