import {
    GET_ALL_SETTINGS_SUCCESS,
    GET_ALL_SETTINGS_FAIL
} from '../constants/settingConstant'

export const fetchSettingData = (settingdata) => {
    try {
        return {
            type: GET_ALL_SETTINGS_SUCCESS,
            data: settingdata,
        };
    } catch (error) {
     console.log(error)
    }

};

export const fetchSettingsFail = (error) => {
    return {
        type: GET_ALL_SETTINGS_FAIL,
        data: error,
    };
};
