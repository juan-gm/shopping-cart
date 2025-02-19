import React from "react";
import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import { initialCart, checkout } from "../actions/cartActions"

const Cart = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.cart)

  useEffect(() => {
    dispatch(initialCart())
    
  }, [dispatch])

  const calculateTotal = (arr) => {
    const sumOfPrices = (acc, current) => acc + current.price * current.quantity
    return Math.round(arr.reduce(sumOfPrices, 0) * 100) / 100
  }
  
  const checkoutCart = () => {
    dispatch(checkout())
  }

  if (products.length === 0) { 
    return  <div className="cart">
      <h2>Your Cart</h2>
      <p>Your cart is empty</p>
      <br/>
      <p>Total: $0</p>
      <a className="button checkout disabled">Checkout</a>
    </div> 
  } else {
    return <div className="cart">
      <h2>Your Cart</h2>
      <table className="cart-items">
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        {products.map(item => {  
          return <tr>
            <td>{item.title}</td>
            <td>{item.quantity}</td>
            <td>${item.price}</td>
          </tr>
        })}

        <tr>
          <td colspan="3" className="total">Total: ${calculateTotal(products)} </td> 
        </tr>
      </table>
      <a className="button checkout" onClick={checkoutCart}>Checkout</a>
    </div>  
  }
}

export default Cart 
