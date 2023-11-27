import Image from "next/image"


const ProductCard = ({ product }: { product: any }) => {
    return (
        <div className="w-[240px] shadow-lg p-2 rounded-lg">
            <div className="relative h-[150px]">
                <Image src={product.image} fill alt="" className="object-contain" />
            </div>
            <div className="text-center mt-2">
                <div>{product.name}</div>
            </div>
        </div>
    )
}

export default ProductCard