import React from "react";
import {useState, useEffect} from "react";

import Header from "./Header"
import ProductSection from "./ProductSection"
import data from '../lib/data' 

const App = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(data)
  }, [])

  return (
    <div id="app">
      <Header products={products}/>
      <ProductSection products={products} />
    </div>
  );
};

export default App
