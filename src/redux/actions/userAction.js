import {LOGIN_USER_SUCCESS,LOGIN__USER_FAIL} from '../constants/userConstant'
import {GET_ALL_IMAGES_SUCCESS} from '../constants/imagesConstant'

export const fetchUserDetails = (userData) => {
    return {
      type: LOGIN_USER_SUCCESS,
      data: userData,
    };
  };

  export const noteRefs = (e) =>{
    return {
      type: 'SET_REFRESH',
      data: e,
    };
  }


  export const fetchImages = (images) =>{
    return {
      type: GET_ALL_IMAGES_SUCCESS,
      data: images,
    };
  }

