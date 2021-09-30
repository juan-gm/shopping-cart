import Product from "./Product"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

const ProductSection = ( ) => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)

  useEffect(() => {
    const updateValues = async () => {
      const fetchedProducts = await axios.get("/api/products");
      dispatch({type: 'SET_PRODUCTS', payload: { products: fetchedProducts.data}}) 
    }

    updateValues()
  }, [])

  return (
    <main>
      <div className="product-listing">
        <h2>Products</h2>
        {products.map(product => {
          return (
            <Product info={product} />
          )
        })}
      </div>
    </main> 
  )
}

export default ProductSection
