import React from "react"
import Cart from "./Cart"

const Header = ({ cart, checkoutCart }) => {
  return <header>
    <h1>The Shop!</h1>
    <Cart products={cart} checkoutCart={checkoutCart} />
  </header>
}

export default Header
