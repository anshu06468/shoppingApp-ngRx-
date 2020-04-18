import { User } from '../user.model';
import * as AuthActions  from './auth.action';

export interface State{
    user:User;
    authError:string;
    loading:boolean;
}


const initialState:State={
    user:null,
    authError:'',
    loading:false
}


export function authReducer(state=initialState,action:AuthActions.AuthActions){

    switch(action.type){
        case AuthActions.LOG_IN:
            const user = new User(
                                 action.payload.email,
                                 action.payload.userId,
                                 action.payload.token,
                                 action.payload.expirationDate
                                 );
            return {
                ...state,
                user:user,
                authError:null,
                loading:false
            };
        case AuthActions.LOG_OUT:
            return {
                ...state,
                user:null,
                authError:null,
            };
        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError:null,
                loading:true
            };
        case AuthActions.LOGIN_FAIL:
            return{
                ...state,
                user:null,
                authError:action.payload,
                loading:false
            };
        default:
            return state;
    }
    
}