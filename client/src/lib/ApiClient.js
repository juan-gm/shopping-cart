import axios from "axios"

const apiClient = {

  getProducts: function(callback) {
    return axios
      .get("/api/products")
      .then(response => response.data)
      .then(callback)
      .catch(err => console.log(err))
  },

  addProduct: function(newProduct, callback) {
    return axios
      .post("/api/products", { ...newProduct })
      .then(response => response.data)
      .then(callback)
      .catch(err => console.log(err))
  },

  updateProduct: function(updatedProduct, id, callback) {
    return axios
      .put(`/api/products/${id}`, { ...updatedProduct})
      .then(response => response.data)
      .then(callback)
      .catch(err => console.log(err))
  },

  deleteProduct: function(id, callback) {
    return axios
      .delete(`/api/products/${id}`)
      .then(callback)
      .catch(err => console.log(err))
  },

  decrementQuantityOfProduct: function(product, id) {
    return axios
      .put(`/api/products/${id}`, {...product, quantity: product.quantity - 1})
      .catch(err => console.log(err))
  },

  addProductToCart: function(productToAdd, callback) {
    return axios
      .post("/api/cart", { ...productToAdd })
      .then(response => response.data)
      .then(callback)
      .catch(err => console.log(err))
  },

  getCart: function(callback) {
    return axios
      .get("/api/cart")
      .then(response => response.data)
      .then(callback)
      .catch(err => console.log(err))
  },

  checkout: function(callback) {
    return axios
      .post("/api/cart/checkout")
      .then(callback)
      .catch(err => console.log(err))
  }
}

export default apiClient

