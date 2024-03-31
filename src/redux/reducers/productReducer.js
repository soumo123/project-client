import {  GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAIL} from "../constants/productConstant";
  
  const initialState = {
    products: [],
    error: "",
  };
  
  const productDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_PRODUCTS_SUCCESS:
        return { ...state, products: action.data};
      case GET_ALL_PRODUCTS_FAIL:
        return { ...state, products: action.data};
      default:
        return state;
    }
  }

  export default productDetailsReducer;