const Product = ({ info }) => {
  return (
    <div className="product">
      <div className="product-details">
        <h3>{info.title}</h3>
        <p className="price">{info.price}</p>
        <p className="quantity">{info.quantity} left in stock</p>
        <div class="actions product-actions">
          <a class="button add-to-cart">Add to Cart</a>
          <a class="button edit">Edit</a>
        </div>
        <a class="delete-button"><span>X</span></a>
      </div>
    </div>
  )
}

export default Product
