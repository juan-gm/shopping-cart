import { useState } from "react"

const EditForm = ({ title, quantity, price, handleUpdate, toggleEditMode }) => {

  const [tempTitle, setTempTitle] = useState(title)
  const [tempQuantity, setTempQuantity] = useState(quantity)
  const [tempPrice, setTempPrice] = useState(price)

  const updateSubmission = () => {
    handleUpdate(tempTitle, tempQuantity, tempPrice)
  }

  return <div class="edit-form">
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
      <a class="button" onClick={updateSubmission}>Update</a>
      <a class="button" onClick={toggleEditMode}>Cancel</a>
    </div>
    </form>
  </div>

}

export default EditForm