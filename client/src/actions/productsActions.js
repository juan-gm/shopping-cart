import apiClient from "../lib/ApiClient"

export const createNewProductSuccess = newProduct => {
  return {type: "CREATE_NEW_PRODUCT", payload: { newProduct }}
}

export const createNewProduct = (newProduct, callback) => {
  return function (dispatch) {
    apiClient.addProduct(
      newProduct,
      (productResponse) => {
        dispatch(createNewProductSuccess(productResponse))
        if (callback) {
          callback()
        }
      }
    )
  }
}

export const updateProductSuccess = (modifiedProduct, toUpdateId) => {
  return { type: "UPDATE_PRODUCT", payload: { modifiedProduct, toUpdateId }}
}

export const updateProduct = (modifiedProduct, toUpdateId, callback) => {
  return function(dispatch) {
    apiClient.updateProduct(
      modifiedProduct,
      toUpdateId,
      (productResponse) => {
        dispatch(updateProductSuccess(productResponse, toUpdateId))
        if (callback) {
          callback()
        }
      }
    )
  }
}

export const deleteProductSuccess = toDeleteId => {
  return { type: "DELETE_PRODUCT", payload: { toDeleteId }}
}

export const deleteProduct = toDeleteId => {
  return function(dispatch) {
    apiClient.deleteProduct(
      toDeleteId,
      () => {
        dispatch(deleteProductSuccess(toDeleteId))
      }
    )
  }
}

export const addToCartSuccess = (productToBeAdded, toDecrementId) => {
  return {type: "ADD_TO_CART", payload: { productToBeAdded, toDecrementId }}
}

export const addToCart = (product, toDecrementId, newProductToAddToTheCart) => {
  return function(dispatch) {
    apiClient.decrementQuantityOfProduct(product, toDecrementId)

    apiClient.addProductToCart(
      newProductToAddToTheCart,
      (productToBeAdded) => {
        dispatch(addToCartSuccess(productToBeAdded, toDecrementId))
      }
    )
  }
}

const setInitialProducts = products => {
  return {type: 'SET_PRODUCTS', payload: { products }}
}

export const productsReceived = () => {
  return function (dispatch) {
    apiClient.getProducts(products => {
      dispatch(setInitialProducts(products))
    })
  }
}
