"use client"
import UseCart from "@/hooks/UseCart";
import { GiBasketballBasket } from "react-icons/gi";
const CardCount = () => {
    const {cartPrdcts} = UseCart();
    return (
        <div className="hidden md:flex">
            <GiBasketballBasket size="38"/>
            <div className="font-semibold">{cartPrdcts?.length}</div>
        </div>
    )
}

export default CardCount