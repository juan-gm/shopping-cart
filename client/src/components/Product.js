import { useState, useEffect } from "react"
import axios from "axios"
import EditForm from "./EditForm"

const Product = ({ info, onDeleteProduct, onAddToCart }) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(info.title)
  const [quantity, setQuantity] = useState(info.quantity)
  const [price, setPrice] = useState(info.price)

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
  }

  const handleUpdateSubmission = async (tempTitle, tempQuantity, tempPrice) => {
    toggleEditMode()
    const updatedProduct = {
      title: tempTitle,
      quantity: tempQuantity,
      price: tempPrice
    }
    
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
          (<EditForm
            title={title}
            quantity={quantity}
            price={price}
            handleUpdate = {handleUpdateSubmission}
            toggleEditMode={toggleEditMode}
          />)

        }
        
        <a class="delete-button" onClick={deleteProduct}><span>X</span></a>
      </div>
    </div>
  )
}

export default Product
