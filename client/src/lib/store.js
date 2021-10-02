import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk"
import allReducers from "./reducers/allReducers";

const store = createStore(allReducers, applyMiddleware(thunk));

export default store;
