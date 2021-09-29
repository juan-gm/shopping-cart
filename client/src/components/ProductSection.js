import Product from "./Product"

const ProductSection = ({ products, onDeleteProduct, onAddToCart } ) => {
  return (
  <main>
    <div className="product-listing">
    <h2>Products</h2>
    {products.map(product => {
      return (
        <Product info={product} onDeleteProduct={onDeleteProduct} onAddToCart={onAddToCart}/>
      )
    })}
  </div>
    </main> )
}

export default ProductSection
