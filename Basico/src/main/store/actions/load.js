import {LOAD_FIREBASE_TOKEN,DEVICE_ORIENTATION} from './actionTypes';

export const setFirebaseToken = (value) => {
    return{
        type: LOAD_FIREBASE_TOKEN,
        payload: value
    }
}

export const setOrientation = (value) => {
    return{
        type: DEVICE_ORIENTATION,
        payload: value
    }
}