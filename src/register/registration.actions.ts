import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { API_ROOT } from '../constants';
import { UserRegistration } from './registration.models';
import { Errors } from '../models';
import { RootState } from '../store';
import { UserResponse } from '../models/user.model';

// Action Types
export const REGISTRATION_REQUESTED = 'REGISTRATION_REQUESTED';
export const REGISTRATION_COMPLETED = 'REGISTRATION_COMPLETED';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

// Actions Interfaces
export interface ActionRegistrationRequested
  extends Action<'REGISTRATION_REQUESTED'> {
  userRegistration: UserRegistration;
}
export interface ActionRegistrationCompleted
  extends Action<'REGISTRATION_COMPLETED'> {}
export interface ActionRegistrationFailed
  extends Action<'REGISTRATION_FAILED'> {
  errors: Errors;
}

export type RegistrationAction =
  | ActionRegistrationRequested
  | ActionRegistrationCompleted
  | ActionRegistrationFailed;

type ThunkResult = ThunkAction<void, RootState, undefined, RegistrationAction>;

// Actions
const registrationCompleted: ActionCreator<
  ActionRegistrationCompleted
> = () => {
  return {
    type: REGISTRATION_COMPLETED,
  };
};

const registrationRequested: ActionCreator<ActionRegistrationRequested> = (
  userRegistration: UserRegistration,
) => {
  return {
    type: REGISTRATION_REQUESTED,
    userRegistration: userRegistration,
  };
};

const registrationFailed: ActionCreator<ActionRegistrationFailed> = (
  errors: Errors,
) => {
  return {
    type: REGISTRATION_FAILED,
    errors: errors,
  };
};

const headers: { [key: string]: string } = {
  'content-type': 'application/json',
};

// async action processors
export const registerUser: ActionCreator<ThunkResult> = (
  userRegistration: UserRegistration,
) => async dispatch => {
  dispatch(registrationRequested(userRegistration));

  try {
    const res = await fetch(`${API_ROOT}/users`, {
      method: 'post',
      headers: headers,
      body: JSON.stringify({ user: userRegistration }),
    });
    if (res.status === 200) {
      const userResponse: UserResponse = await res.json();
      localStorage.setItem('user', JSON.stringify(userResponse));
      dispatch(registrationCompleted(userResponse.user));
    } else {
      dispatch(registrationFailed((await res.json()).errors as Errors));
    }
  } catch (err) {
    dispatch(registrationFailed());
  }
};
