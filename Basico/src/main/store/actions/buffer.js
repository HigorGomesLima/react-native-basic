import {FORM_BUFFER} from './actionTypes';

export const handleChange = (id,data) => {
    return{
        type: FORM_BUFFER,
        payload: {
            id: id,
            data: data
        }
    }
}