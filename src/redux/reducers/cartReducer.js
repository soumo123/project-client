import {
    GET_CART_PRODUCTS_SUCCESS,
    GET_CART_PRODUCTS_FAIL
} from "../constants/productConstant";

const initialState = {
    carts: [],
    error: "",
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_PRODUCTS_SUCCESS:
            return { ...state, carts: action.data };
        case GET_CART_PRODUCTS_FAIL:
            return { ...state, carts: action.data };
        default:
            return state;
    }
}

export default cartReducer;