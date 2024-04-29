import {
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_FAIL
} from "../constants/productConstant";

const initialState = {
    categories: [],
    error: "",
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES_SUCCESS:
            return { ...state, categories: action.data };
        case GET_ALL_CATEGORIES_FAIL:
            return { ...state, categories: action.data };
        default:
            return state;
    }
}

export default categoryReducer;