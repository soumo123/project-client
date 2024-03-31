import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './redux/reducers/userReducer'
import productDetailsReducer from './redux/reducers/productReducer'
import noteRef from './redux/reducers/noteRef'
import cartReducer from './redux/reducers/cartReducer'



const reducer = combineReducers({
    userDetails:userReducer,
    productDetails:productDetailsReducer,
    noteRef:noteRef,
    cartDetails:cartReducer
})


let initialState ={
    cart: {
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],
        shippingInfo: localStorage.getItem("shippingInfo")
          ? JSON.parse(localStorage.getItem("shippingInfo"))
          : {},
      },

}




const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;

