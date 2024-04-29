import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './redux/reducers/userReducer'
import productDetailsReducer from './redux/reducers/productReducer'
import noteRef from './redux/reducers/noteRef'
import cartReducer from './redux/reducers/cartReducer'
import imageReducer from './redux/reducers/imageReducer'
import categoryReducer from './redux/reducers/categoriesReducer'



const reducer = combineReducers({
    userDetails:userReducer,
    productDetails:productDetailsReducer,
    noteRef:noteRef,
    cartDetails:cartReducer,
    categoryDetails:categoryReducer,
    imageReducer:imageReducer
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

