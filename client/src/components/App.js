import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"

import Header from "./Header"
import ProductSection from "./ProductSection"
import AddForm from "./AddForm"

const App = () => {
  const dispatch = useDispatch()

  return (
    <div id="app">
      <Header />
      <ProductSection />
      <AddForm />
    </div>
  );
};

export default App
