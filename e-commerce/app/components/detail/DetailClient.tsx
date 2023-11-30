"use client"

import Image from "next/image"
import PageContainer from "../containers/PageContainer"
import { Rating } from "@mui/material";
import Counter from "../general/Counter"
import { useState } from "react"
import Button from "../general/Button";

export type CardProductProps = {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  image: string
  inStock: boolean
}

const DetailClient = ({ product }: { product: any }) => {

  const [cardProduct, setCardProduct] = useState<CardProductProps>({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: 1,
    image: product.image,
    inStock: product.inStock
  });

  const increaseFunc = () => {
    if (cardProduct.quantity == 10) return
    setCardProduct(prev => ({ ...prev, quantity: prev.quantity + 1 }))
  }

  const decreaseFunc = () => {
    if (cardProduct.quantity == 1) return
    setCardProduct(prev => ({ ...prev, quantity: prev.quantity - 1 }))
  }
  let productRating = product?.reviews?.reduce((acc: number, item: any) => acc + item.rating, 0) / product?.reviews?.length

  return (
    <div className="my-10">
      <PageContainer>
        <div className="block md:flex gap-14 justify-center">
          <div className="relative h-[400px] w-[400px]">
            <Image src={product?.image} fill alt="" />
          </div>
          <div className="w-2/3 space-y-3">
            <div className="text-xl md:text-2xl">{product?.name}</div>
            <Rating name="read-only" value={productRating} readOnly />
            <div className="text-slate-500">{product?.description}</div>
            <div className="flex items-center gap-2">
              <div>STOK DURUMU:</div>
              {
                product?.inStock ? <div className="text-green-500 font-semibold">Ürün Stokta Mevcut</div> : <div className="text-red-500 font-semibold">Ürün Stokta Bulunmamaktadır!</div>
              }
            </div>
            <Counter cardProduct={cardProduct} increaseFunc={increaseFunc} decreaseFunc={decreaseFunc} />
            <div className="font-semibold text-orange-500 text-xl md:text-2xl">{product.price}$</div>
            <Button text="Sepete Ekle" small onClick={() => { }} />
          </div>

        </div>
      </PageContainer>
    </div>
  )
}

export default DetailClient