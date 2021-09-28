import { useState, useEffect } from "react"

const Product = ({ info }) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(info.title)
  const [quantity, setQuantity] = useState(info.quantity)
  const [price, setPrice] = useState(info.price)

  const toggleEditMode = () => {
    setEditMode(!editMode)
  } 

  return (
    <div className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <p className="quantity">{quantity} left in stock</p>

        { !editMode ? 

        (<div class="actions product-actions">
          <a class="button add-to-cart">Add to Cart</a>
          <a class="button edit" onClick={toggleEditMode}>Edit</a>
        </div>)
          :

          (<div class="edit-form">
               <h3>Edit Product</h3>
            <form>
              <div class="input-group">
                <label for="product-name">Product Name</label>
                <input type="text" id="product-name" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div class="input-group">
                <label for="product-price">Price</label>
                <input type="text" id="product-price" value={price} onChange={(e) => setPrice(+e.target.value)} />
              </div>

              <div class="input-group">
                <label for="product-quantity">Quantity</label>
                <input type="text" id="product-quantity" value={quantity} onChange={(e) => setQuantity(+e.target.value)} />
              </div>

              <div class="actions form-actions">
                <a class="button">Update</a>
                <a class="button" onClick={toggleEditMode}>Cancel</a>
              </div>
            </form>
          
            </div>
          )}
        
        <a class="delete-button"><span>X</span></a>
      </div>
    </div>
  )
}

export default Product
