import React from "react"

import Cart from "./Cart"

const Header = ({ products }) => {
  return <header>
    <h1>The Shop!</h1>
    <Cart products={products}/>
  </header>
}

export default Header
