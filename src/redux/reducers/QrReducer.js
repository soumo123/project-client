import {
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    REMOVE_FROM_CART,
    CLEAN_CART
} from "../constants/productConstant";

const initialState = {
    carts: [],
    error: "",
};

const qrcartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                carts: [...state.carts, action.data]  // Append the new item to the existing carts array
            };
        case ADD_TO_CART_FAIL:
            return { ...state, error: action.data };

        case REMOVE_FROM_CART:
            return {
                ...state,
                carts: state.carts.filter((item) =>
                    item._id !== action.payload.productId || item.weight !== action.payload.weight
                ),
            };

        case CLEAN_CART:
            return { ...state, carts: []  };
        
        default:
            return state;
    }
}

export default qrcartReducer;