import { GET_ALL_IMAGES_SUCCESS,
    GET_ALL_IMAGES_FAIL} from "../constants/imagesConstant";
  
  const initialState = {
    images: [],
    error: "",
  };
  
  const imageReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_IMAGES_SUCCESS:
        return { ...state, images: action.data};
      case GET_ALL_IMAGES_FAIL:
        return { ...state, images: action.data};
      default:
        return state;
    }
  }

  export default imageReducer;