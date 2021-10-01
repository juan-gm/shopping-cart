import { useState } from "react"
import axios from "axios"
import {useDispatch} from "react-redux"
import { createNewProduct } from "../actions/productsActions"

const AddForm = () => {
  const dispatch = useDispatch()
  
  const [adding, setAdding] = useState(false)
  const [title, setTitle] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")

  const closeAndResetForm = () => {
    setAdding(!adding)
    setTitle("")
    setQuantity("")
    setPrice("")
  }

  const addProductSubmit = async (e) => {
    e.preventDefault()

    const newProduct = {
      title,
      price,
      quantity
    }

    try {
      const response = await axios.post("/api/products", {...newProduct})
      dispatch(createNewProduct(response.data))
    } catch(e) {
      console.log(e);
    }

    closeAndResetForm()
  }
  
  return <div className={adding ? "add-form visible" : "add-form"}>
    <p><a className="button add-product-button" onClick={() => setAdding(!adding)}>Add A Product</a></p>
    <h3>Add Product</h3>
    <form>
      <div className="input-group">
        <label for="product-name">Product Name</label>
        <input type="text" id="product-name" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="input-group">
        <label for="product-price">Price</label>
        <input type="text" id="product-price" value={price} onChange={(e) => setPrice(+e.target.value)} />
      </div>

      <div className="input-group">
        <label for="product-quantity">Quantity</label>
        <input type="text" id="product-quantity" value={quantity} onChange={(e) => setQuantity(+e.target.value)} />
      </div>

      <div className="actions form-actions">
        <a className="button" onClick={addProductSubmit}>Add</a>
        <a className="button" onClick={closeAndResetForm}>Cancel</a>
      </div>
    </form>
  </div>
}

export default AddForm
