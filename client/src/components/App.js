import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";

import Header from "./Header"
import ProductSection from "./ProductSection"
import Form from "./Form"

import data from '../lib/data' 

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

  const handleSubmission = async (newProduct) => {
    console.log(newProduct)
    try {
      const response = await axios.post("/api/products", {...newProduct})
      const data = response.data
      setProducts(products.concat(data));
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div id="app">
      <Header cart={cart}/>
      <ProductSection products={products} />
      <Form onSubmission={handleSubmission}/>
    </div>
  );
};

export default App
