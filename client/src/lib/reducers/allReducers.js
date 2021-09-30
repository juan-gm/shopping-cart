import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({ products: productReducer, cart: cartReducer });

export default allReducers;
