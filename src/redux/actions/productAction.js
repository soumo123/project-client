import {
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAIL,
    GET_CART_PRODUCTS_SUCCESS,
    GET_CART_PRODUCTS_FAIL,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_FAIL
} from '../constants/productConstant'

export const fetchProducts = (productData) => {
    console.log("productDataproductDataproductDataproductData", productData)

    try {

        return {
            type: GET_ALL_PRODUCTS_SUCCESS,
            data: productData,
        };
    } catch (error) {
     console.log(error)
    }

};

export const fetchProductsFail = (error) => {
    return {
        type: GET_ALL_PRODUCTS_FAIL,
        data: error,
    };
};

export const noteRefs = (e) => {
    return {
        type: 'SET_REFRESH',
        data: e,
    };
}


export const fetchCartProducts = (cart) => {
    return {
        type: GET_CART_PRODUCTS_SUCCESS,
        data: cart,
    };
};

export const fetchCartProductsFail = (error) => {
    return {
        type: GET_CART_PRODUCTS_FAIL,
        data: error,
    };
};


export const fetchCategoriesSuccess = (data) => {
    return {
        type: GET_ALL_CATEGORIES_SUCCESS,
        data: data,
    };
};

export const fetchCategoriesFail = (error) => {
    return {
        type: GET_ALL_CATEGORIES_FAIL,
        data: error,
    };
};
