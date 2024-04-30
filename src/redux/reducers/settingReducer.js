import {
    GET_ALL_SETTINGS_SUCCESS,
    GET_ALL_SETTINGS_FAIL
} from "../constants/settingConstant";

const initialState = {
    settings: [],
    error: "",
};

const settingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SETTINGS_SUCCESS:
            return { ...state, settings: action.data };
        case GET_ALL_SETTINGS_FAIL:
            return { ...state, settings: action.data };
        default:
            return state;
    }
}

export default settingReducer;