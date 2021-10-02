import { useState, useEffect } from "react"
import EditForm from "./EditForm"
import { useDispatch } from "react-redux"
import { addToCart, deleteProduct } from "../actions/productsActions"

const Product = ({ info }) => {
  const dispatch = useDispatch()

  const [editMode, setEditMode] = useState(false)
  const [isOutOfStock, setIsOutOfStock] = useState(false)

  const onDeleteProduct = async () => {
    dispatch(deleteProduct(info._id))
  }

  const addProductToCart = async () => {
    if (!isOutOfStock) {
      const newItemToAddToTheCart = {
        productId: info._id,
        title: info.title,
        price: +info.price
      }

      dispatch(addToCart(info, info._id, newItemToAddToTheCart))

    }
  }


  useEffect(() => {
    if (info.quantity > 0) {
      setIsOutOfStock(false)
    } else {
      setIsOutOfStock(true)
    }
  }, [info.quantity])

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  
  return (
    <div className="product">
      <div className="product-details">
        <h3>{info.title}</h3>
        <p className="price">${info.price}</p>
        <p className="quantity">{info.quantity} left in stock</p>

        { !editMode ? 

        (<div class="actions product-actions">
          <a className={"button add-to-cart" + (isOutOfStock ? " disabled" : "")} onClick={addProductToCart}>Add to Cart</a>
          <a className="button edit" onClick={toggleEditMode}>Edit</a>
        </div>)
          :
        (<EditForm
          title={info.title}
          quantity={info.quantity}
          price={info.price}
          id={info._id}
          toggleEditMode={toggleEditMode}
        />)
        }
        
        <a class="delete-button" onClick={onDeleteProduct}><span>X</span></a>
      </div>
    </div>
  )
}

export default Product
