import Product from "./Product"

const ProductSection = ({ products } ) => {
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
    </main> )
}

export default ProductSection
