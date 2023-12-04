"use client"

import UseCart from "@/hooks/UseCart"
import PageContainer from "../containers/PageContainer"
import Image from "next/image";
import Button from "../general/Button";

const CartClient = () => {
    const { cartPrdcts } = UseCart();
    if (!cartPrdcts || cartPrdcts.length == 0) {
        return <div>Sepetinizde Urun Bulunmamaktadir.</div>
    }
    return (
        <div className="my-3 md:my-10">
            <PageContainer>
                <div className="flex items-center font-semibold gap-3 text-center border-b py-3">
                    <div className="w-1/5">Ürün Resmi</div>
                    <div className="w-1/5">Ürün Adı</div>
                    <div className="w-1/5">Ürün Miktarı</div>
                    <div className="w-1/5">Ürün Fiyatı</div>
                    <div className="w-1/5"></div>
                </div>
                <div>
                    {
                        cartPrdcts.map((cart) => (
                            <div className="flex items-center justify-between text-center my-5" key={cart.id}>
                                <div className="w-1/5 flex justify-center items-center">
                                    <Image src={cart.image} width={60} height={60} alt="" />
                                </div>
                                <div className="w-1/5">{cart.name}</div>
                                <div className="w-1/5">2</div>
                                <div className="w-1/5 text-orange-600 text-lg font-semibold">{cart.price} $</div>
                                <div className="w-1/5">
                                    <Button text="Ürünü Sil" small  onClick={() => { }} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </PageContainer>
        </div>
    )
}

export default CartClient