import apiClient from "../lib/ApiClient"

export const initialCartSuccess = (initialCartProducts) => {
  return {type: 'SET_CART', payload: { cart: initialCartProducts }}
}

export const initialCart = () => {
  return function (dispatch) {
    apiClient.getCart(initialCartProducts => {
      dispatch(initialCartSuccess(initialCartProducts))
    })
  }
}

export const checkoutSuccess = () => {
  return {type: "CHECKOUT"}
}

export const checkout = () => {
  return function (dispatch) {
    apiClient.checkout(() => dispatch(checkoutSuccess()))
  }
}