"use client"
// useState kullandigimiz icin "use client" yapiyoruz cunku state guncellemesi client tarafinda olmaktadir
import { CardProductProps } from '@/app/components/detail/DetailClient'
import { useState, createContext, useContext, useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'

interface CartContextProps {
    productCartQty: number
    addToBasket: (product: CardProductProps) => void
    removeFromCart: (product: CardProductProps) => void
    cartPrdcts: CardProductProps[] | null
    removeCart: () => void
}
const CartContext = createContext<CartContextProps | null>(null)

interface Props {
    [propName: string]: any
}

export const CartContextProvider = (props: Props) => {
    const [productCartQty, setProductCartQty] = useState(0)
    const [cartPrdcts, setCartPrdcts] = useState<CardProductProps[] | null>(null)

    useEffect(() => {
        let getItem: any = localStorage.getItem('cart')
        let getItemParse: CardProductProps[] | null = JSON.parse(getItem)
        setCartPrdcts(getItemParse)
    }, [])

    const removeCart = useCallback(() => {
        setCartPrdcts(null)
        toast.success('Sepete Temizlendi!')
        localStorage.setItem('cart', JSON.stringify(null))

    }, [])

    const addToBasket = useCallback((product: CardProductProps) => {
        setCartPrdcts(prev => {
            let updatedCart;
            if (prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }
            toast.success('Ürün Sepete Eklendi!')
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            return updatedCart;
        })
    }, [cartPrdcts])

    const removeFromCart = useCallback((product: CardProductProps) => {
        if (cartPrdcts) {
            const filteredProducts = cartPrdcts.filter(cart => cart.id != product.id)
            setCartPrdcts(filteredProducts)
            toast.success('Ürün Sepetten Silindi!')
            localStorage.setItem('cart', JSON.stringify(filteredProducts))
        }
    }, [cartPrdcts])


    let value = {
        productCartQty,
        addToBasket,
        cartPrdcts,
        removeFromCart,
        removeCart
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