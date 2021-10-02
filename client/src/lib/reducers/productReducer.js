// Cart: once an item is in the cart, all that can happen is it's cleared or the quantity increases
// Products: add to the list of products -> collection of products
// Product(no s): the state of name, quantity, and price which can be altered temporarily as well as long term/db

const productReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_NEW_PRODUCT": {
      return state.concat(action.payload.newProduct) // which will be {title: "", quantity: 5, price: 5}
    }
    case "DELETE_PRODUCT": {
      return state.filter(product => product._id !== action.payload.toDeleteId) 
    }
    case "UPDATE_PRODUCT": {
      const products = state.map(product => {
        if (product._id === action.payload.toUpdateId) {
          return action.payload.modifiedProduct
        } else {
          return product
        }
      })
      console.log(products)
      return products
    }
    case "ADD_TO_CART": {
      return state.map(product => {
        if (product._id === action.payload.toDecrementId) {
          return {...product, quantity: product.quantity - 1}
        } else {
          return product
        }
      })
    }
    case "SET_PRODUCTS": {
      return action.payload.products
    }
    default: {
      return state
    }
  }
}

export default productReducer
