const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      if (state.find(p => p.title === action.payload.productToBeAdded.title)) {
        return (state.map(p => {
          if (p.title === action.payload.productToBeAdded.title) {
            return { ...p, quantity: p.quantity + 1 }
          } else {
            return p
          }
        }))
      } else {
        return (state.concat({ ...action.payload.productToBeAdded, quantity: 1 }))
      }
    }
    case "CHECKOUT": {
      return []
    }
    case "SET_CART": {
      return action.payload.cart
    }
  }

  return state
}

export default cartReducer
