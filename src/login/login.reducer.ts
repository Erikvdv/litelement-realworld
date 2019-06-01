import { Reducer } from 'redux';
import { LOGIN_REQUESTED, LOGIN_REFRESH_REQUESTED, LOGIN_COMPLETED, LOGIN_FAILED, LoginAction } from './login.actions';
import { Errors } from '../models';
import { User } from '../models/user.model';

export interface LoginState {
    user: User;
    failure: boolean;
    isFetching: boolean;
    isLoggedIn: boolean;
    errors?: Errors;
}

const initialState: LoginState = {
    user: {bio: '', email: '', image: '', token: '', username: ''},
    failure: false,
    isFetching: false,
    isLoggedIn: false,
};

const login: Reducer<LoginState, LoginAction> = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUESTED:
            return {
                ...initialState,
                isFetching: true,
                failure: false
            };
        case LOGIN_REFRESH_REQUESTED:
            return {
                ...initialState,
                isFetching: true,
                failure: false
            };
        case LOGIN_FAILED:
            return {
                ...state,
                isFetching: false,
                failure: true,
                errors: action.errors
            };
        case LOGIN_COMPLETED:
            return {
                ...state,
                user: action.user,
                isFetching: false,
                failure: false,
                isLoggedIn: true
            };
        default:
            return state;
    }
};

export default login;

