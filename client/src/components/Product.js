import { useState, useEffect } from "react"
import axios from "axios"

const Product = ({ info, onDeleteProduct, onAddToCart }) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(info.title)
  const [quantity, setQuantity] = useState(info.quantity)
  const [price, setPrice] = useState(info.price)

  const [tempTitle, setTempTitle] = useState(title)
  const [tempQuantity, setTempQuantity] = useState(quantity)
  const [tempPrice, setTempPrice] = useState(price)

  const [isOutOfStock, setIsOutOfStock] = useState(false)

  useEffect(() => {
    if (quantity > 0) {
      setIsOutOfStock(false)
    } else {
      setIsOutOfStock(true)
    }
  }, [quantity])

  const toggleEditMode = () => {
    setEditMode(!editMode)

    setTempTitle(title)
    setTempQuantity(quantity)
    setTempPrice(price)

  }

  const handleUpdateSubmission = async () => {
    toggleEditMode()
    const updatedProduct = {
      title: tempTitle,
      quantity: tempQuantity,
      price: tempPrice
    }

    console.log(info)
    const id = info._id

    try {
      const response = await axios.put(`/api/products/${id}`, {...updatedProduct})
      const data = response.data
      setTitle(data.title)
      setPrice(+data.price)
      setQuantity(+data.quantity)
    } catch(e) {
      console.log(e);
    }
  }

  const deleteProduct = async () => {
    const id = info._id
    onDeleteProduct(id)
  }

  const addProductToCart = async () => {
    onAddToCart(info)

    await axios.put(`/api/products/${info._id}`, {...info, quantity: quantity - 1})
    setQuantity(quantity - 1)
  }
  return (
    <div className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <p className="quantity">{quantity} left in stock</p>

        { !editMode ? 

        (<div class="actions product-actions">
          <a className={"button add-to-cart" + (isOutOfStock ? " disabled" : "")} onClick={addProductToCart}>Add to Cart</a>
          <a className="button edit" onClick={toggleEditMode}>Edit</a>
        </div>)
          :

          (<div class="edit-form">
               <h3>Edit Product</h3>
            <form>
              <div class="input-group">
                <label for="product-name">Product Name</label>
                <input type="text" id="product-name" value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} />
              </div>

              <div class="input-group">
                <label for="product-price">Price</label>
                <input type="text" id="product-price" value={tempPrice} onChange={(e) => setTempPrice(+e.target.value)} />
              </div>

              <div class="input-group">
                <label for="product-quantity">Quantity</label>
                <input type="text" id="product-quantity" value={tempQuantity} onChange={(e) => setTempQuantity(+e.target.value)} />
              </div>

              <div class="actions form-actions">
                <a class="button" onClick={handleUpdateSubmission}>Update</a>
                <a class="button" onClick={toggleEditMode}>Cancel</a>
              </div>
            </form>
          
            </div>
          )}
        
        <a class="delete-button" onClick={deleteProduct}><span>X</span></a>
      </div>
    </div>
  )
}

export default Product
