import { products } from "@/utils/Product"
import Heading from "../general/Heading"
import ProductCard from "./ProductCard"


const Products = () => {
  return (
    <div>
        <Heading text="Tüm Ürünler"/>
        <div>
            {products.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    </div>
  )
}

export default Products