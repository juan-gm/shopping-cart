import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";

import Header from "./Header"
import ProductSection from "./ProductSection"
import AddForm from "./AddForm"

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    const updateValues = async () => {
    const fetchedProducts = await axios.get("/api/products");
    setProducts(fetchedProducts.data)

    const fetchedCart = await axios.get("/api/cart");
    setCart(fetchedCart.data)
    }

    updateValues()
  }, [])

  const handleNewSubmission = async (newProduct) => {
    try {
      const response = await axios.post("/api/products", {...newProduct})
      const data = response.data
      setProducts(products.concat(data));
    } catch(e) {
      console.log(e);
    }
  }
  
  const handleDeleteProduct = async (id) => {
    await axios.delete(`/api/products/${id}`)
    setProducts(products.filter((prod) => prod._id !== id))
  }

  const addProductToCart = async (product) => {
    if (cart.find(prod => prod.title === product.title)) {
      setCart(cart.map(prod => {
        if (prod.title === product.title) {
          return { ...prod, quantity: prod.quantity + 1 }
        } else {
          return prod
        }
      }))
    } else {
      setCart(cart.concat({ ...product, quantity: 1 }))
    }

    const newItemToAddToTheCart = {
      productId: product._id,
      title: product.title,
      price: product.price
    }
    await axios.post("/api/cart", {...newItemToAddToTheCart})


  }

  const checkoutCart = async () => {
    setCart([])
    await axios.post("/api/cart/checkout")
  }

  return (
    <div id="app">
      <Header cart={cart} checkoutCart={checkoutCart} />
      <ProductSection products={products} onDeleteProduct={handleDeleteProduct} onAddToCart={addProductToCart} />
      <AddForm onSubmission={handleNewSubmission}/>
    </div>
  );
};

export default App
