export const initialCart = (initialCartProducts) => {
  return {type: 'SET_CART', payload: { cart: initialCartProducts }}
}

export const checkout = () => {
  return {type: "CHECKOUT"}
}