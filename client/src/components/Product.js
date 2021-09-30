import { useState, useEffect } from "react"
import axios from "axios"
import EditForm from "./EditForm"
import { useDispatch, useSelector } from "react-redux"

const Product = ({ info }) => {
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(info.title)
  const [quantity, setQuantity] = useState(info.quantity)
  const [price, setPrice] = useState(info.price)


  const [isOutOfStock, setIsOutOfStock] = useState(false)

  const onDeleteProduct = async () => {
    await axios.delete(`/api/products/${info._id}`)
    dispatch({ type: "DELETE_PRODUCT", payload: { toDeleteId: info._id }})
  }

  const addProductToCart = async () => {
    const productToBeAdded = await updateCart()
    await decrementQuantity()
    dispatch({type: "ADD_TO_CART", payload: { productToBeAdded, toDecrementId: info._id }}) 
  }

  const updateCart = async () => {
    const newItemToAddToTheCart = {
      productId: info._id,
      title: info.title,
      price: +info.price
    }

    const response = await axios.post("/api/cart", {...newItemToAddToTheCart})
    return response.data
  }

  const decrementQuantity = async () => {
    await axios.put(`/api/products/${info._id}`, {...info, quantity: info.quantity - 1})
  }

  useEffect(() => {
    setQuantity(info.quantity)
  }, [info.quantity])

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
  console.log("BEHOLD THE QUANTITY", quantity, info)
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
        
        <a class="delete-button" onClick={onDeleteProduct}><span>X</span></a>
      </div>
    </div>
  )
}

export default Product
