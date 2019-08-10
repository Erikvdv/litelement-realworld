import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { API_ROOT } from '../constants';
import { Errors } from '../models';
import { User, UserResponse } from '../models/user.model';
import { navigate } from '../root/root.actions';
import { RootState } from '../store';
import { UserLogin } from './login.model';

// Action Types
export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_REFRESH_REQUESTED = 'LOGIN_REFRESH_REQUESTED';
export const LOGIN_COMPLETED = 'LOGIN_COMPLETED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

// Actions Interfaces
export interface ActionLoginRequested extends Action<'LOGIN_REQUESTED'> {
  userLogin: UserLogin;
}

export interface ActionLoginRefreshRequested
  extends Action<'LOGIN_REFRESH_REQUESTED'> {}
export interface ActionLoginCompleted extends Action<'LOGIN_COMPLETED'> {
  user: User;
}
export interface ActionLoginFailed extends Action<'LOGIN_FAILED'> {
  errors: Errors;
}

export type LoginAction =
  | ActionLoginRequested
  | ActionLoginRefreshRequested
  | ActionLoginCompleted
  | ActionLoginFailed;

type ThunkResult = ThunkAction<void, RootState, undefined, LoginAction>;

// Actions
const loginCompleted: ActionCreator<ActionLoginCompleted> = (user: User) => {
  return {
    type: LOGIN_COMPLETED,
    user,
  };
};

const loginRequested: ActionCreator<ActionLoginRequested> = (
  userLogin: UserLogin,
) => {
  return {
    type: LOGIN_REQUESTED,
    userLogin,
  };
};

const loginRefreshRequested: ActionCreator<ActionLoginRefreshRequested> = (
  user: User,
) => {
  return {
    type: LOGIN_REFRESH_REQUESTED,
    user,
  };
};

const loginFailed: ActionCreator<ActionLoginFailed> = (errors: Errors) => {
  return {
    type: LOGIN_FAILED,
    errors,
  };
};

const headers: { [key: string]: string } = {
  'content-type': 'application/json',
};

// async action processors
export const loginUser: ActionCreator<ThunkResult> = (
  userLogin: UserLogin,
) => async dispatch => {
  dispatch(loginRequested(userLogin));

  try {
    const res = await fetch(`${API_ROOT}/users/login`, {
      method: 'post',
      headers,
      body: JSON.stringify({ user: userLogin }),
    });
    if (res.status === 200) {
      const userResponse: UserResponse = await res.json();
      localStorage.setItem('user', JSON.stringify(userResponse));
      window.history.pushState({}, '', '/');
      dispatch(loginCompleted(userResponse.user));
      dispatch(navigate());
    } else {
      dispatch(loginFailed((await res.json()).errors as Errors));
    }
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const loginRefresh: ActionCreator<ThunkResult> = (
  user: User,
) => async dispatch => {
  dispatch(loginCompleted(user));
  dispatch(loginRefreshRequested());

  try {
    const res = await fetch(`${API_ROOT}/user`, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        authorization: 'Token ' + user.token,
      },
    });
    if (res.status === 200) {
      const userResponse: UserResponse = await res.json();
      localStorage.setItem('user', JSON.stringify(userResponse));
      dispatch(loginCompleted(userResponse.user));
    } else {
      dispatch(loginFailed((await res.json()).errors as Errors));
    }
  } catch (err) {
    dispatch(loginFailed({}));
  }
};
