import Product from "./Product"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { productsReceived } from "../actions/productsActions";

const ProductSection = ( ) => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)

  useEffect(() => {
    dispatch(productsReceived())
  }, [dispatch])

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
