import { USER_LOGIN, USER_LOCATION, USER_DELIVERY, USER_DELIVERY_CONCLUDED, USER_HISTORICO_LOAD } from '../actions/actionTypes';

const initialState = {
    cpf: '',
    nome: '',
    unidade: '',
    fone: '',
    email: '',
    token: '',
    historico: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        
        case USER_LOGIN:
            console.log(action.payload);
            return{
                ... state,
                cpf: action.payload.cpf,
                nome: action.payload.nome,
                unidade: action.payload.unidade
            }
        case USER_LOCATION:
            return{
                ... state,
                user_latitude: action.payload.user_latitude,
                user_longitude: action.payload.user_longitude
            }
        case USER_DELIVERY:
            var delivery = state.delivery_list;
            action.payload.map((value) => {
                delivery[value.id] = {
                    ... value,
                    itens: JSON.parse(value.itens)
                }
            })
            return{
                ... state,
                delivery_list: delivery
            }
        
        case USER_DELIVERY_CONCLUDED:
            return{
                ... state,
                delivery_concluded_list: action.payload
            }
        
        case USER_HISTORICO_LOAD:
            return{
                ... state,
                historico: action.payload
            }
        
        default:
            return state
    }
}

export default reducer;