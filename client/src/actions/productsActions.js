export const createNewProduct = newProduct => {
  return {type: "CREATE_NEW_PRODUCT", payload: { newProduct }}
}

export const updateProduct = (modifiedProduct, toUpdateId) => {
  return { type: "UPDATE_PRODUCT", payload: { modifiedProduct, toUpdateId }}
}

export const deleteProduct = toDeleteId => {
  return { type: "DELETE_PRODUCT", payload: { toDeleteId }}
}

export const addToCart = (productToBeAdded, toDecrementId) => {
  return {type: "ADD_TO_CART", payload: { productToBeAdded, toDecrementId }}
}

export const setInitialProducts = products => {
  return {type: 'SET_PRODUCTS', payload: { products }}
}