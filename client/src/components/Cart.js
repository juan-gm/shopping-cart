import React from "react";


const Cart = ({ products }) => {

  const calculateTotal = (arr) => {
    const reducerFunction = (acc, currentElement) => acc + currentElement.price * currentElement.quantity
    return Math.round(arr.reduce(reducerFunction, 0) * 100) / 100
  }
  
    if (products.length === 0) {

      return  <div className="cart">
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
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
              <td>{item.price}</td>
            </tr>
          })}
          
          <tr>
            <td colspan="3" className="total">Total: {calculateTotal(products)} </td>
          </tr>
        </table>
        <a className="button checkout">Checkout</a>
      </div>  
    }
}
export default Cart 

/*
 *      */
