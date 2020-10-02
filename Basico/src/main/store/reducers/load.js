import { LOAD_BEGIN, LOAD_FIREBASE_TOKEN, DEVICE_ORIENTATION, USER_LOCATION } from '../actions/actionTypes';

const initialState = {
    user_cpf: '',
    user_pass: '',
    custom_style: {
        color_primary: '#000',
        color_back: '#fff',
        color_alert: '#f00',
    },
    firebase_token: '',
    orientation: '',
    latitude: '',
    longitude: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_BEGIN:
            if (action.payload.status) {
                return {
                    ... state,
                    custom_style: action.payload.data.custom_style,
                    user_cpf: action.payload.data.user_cpf,
                    user_pass: action.payload.data.user_pass
                }
            } else {

                return {
                    ... state
                }

            }
            
        case LOAD_FIREBASE_TOKEN:
            return {
                ... state,
                firebase_token: action.payload
            }

        case DEVICE_ORIENTATION:
            return{
                ... state,
                orientation: action.payload
            }

        case USER_LOCATION:
            return{
                ... state,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude
            }
            
        default:
            return state;
    }
}

export default reducer;