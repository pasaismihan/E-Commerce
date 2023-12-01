"use client"
// useState kullandigimiz icin "use client" yapiyoruz cunku state guncellemesi client tarafinda olmaktadir
import { CardProductProps } from '@/app/components/detail/DetailClient'
import { useState, createContext, useContext, useCallback } from 'react'

interface CartContextProps {
    productCartQty: number
    addToBasket: (product: CardProductProps) => void
    cartPrdcts: CardProductProps[] | null
}
const CartContext = createContext<CartContextProps | null>(null)

interface Props {
    [propName: string]: any
}

export const CartContextProvider = (props: Props) => {
    const [productCartQty, setProductCartQty] = useState(0)
    const [cartPrdcts, setCartPrdcts] = useState<CardProductProps[] | null>(null)

    const addToBasket = useCallback((product: CardProductProps) => {
        setCartPrdcts(prev => {
            let updatedCart;
            if (prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }
            return updatedCart;
        })
    }, [cartPrdcts])


    let value = {
        productCartQty,
        addToBasket,
        cartPrdcts
    }
    return (
        <CartContext.Provider value={value} {...props} />
    )
}



const UseCart = () => {
    const context = useContext(CartContext)
    if (context == null) {
        throw new Error("Bir hata mevcut")
    }
    return context
}

export default UseCart