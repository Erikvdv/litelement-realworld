import { ActionType, getType } from 'typesafe-actions';
import { userLogin, autoLogin, userRegistration } from './user.actions';
import { RequestStatus } from '../../models/request-status.model';
import { User } from '../../models/user.model';
import { Errors } from '../../models';
import * as userActions from './user.actions';

type UserAction = ActionType<typeof userActions>;

export interface UserState {
  isLoggedin: boolean;
  userLoginStatus: RequestStatus;
  autoLoginStatus: RequestStatus;
  userRegistrationStatus: RequestStatus;
  updateUserStatus: RequestStatus;
  user?: User;
  token?: string;
  errors?: Errors;
  registrationErrors?: Errors;
  updateUserErrors?: Errors;
}

const initialState: UserState = {
  isLoggedin: false,
  userLoginStatus: RequestStatus.notStarted,
  autoLoginStatus: RequestStatus.notStarted,
  updateUserStatus: RequestStatus.notStarted,
  userRegistrationStatus: RequestStatus.notStarted,
};

export default (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case getType(userLogin.request):
      return {
        ...state,
        userLoginStatus: RequestStatus.fetching,
        errors: undefined,
      };
    case getType(userLogin.failure):
      return {
        ...state,
        userLoginStatus: RequestStatus.failed,
        errors: action.payload,
      };
    case getType(userLogin.success):
      return {
        ...state,
        userLoginStatus: RequestStatus.completed,
        isLoggedin: true,
        user: action.payload,
        token: action.payload.token,
        errors: undefined,
      };
    case getType(autoLogin.request):
      return {
        ...state,
        autoLoginStatus: RequestStatus.fetching,
        errors: undefined,
      };
    case getType(autoLogin.failure):
      return {
        ...state,
        isLoggedin: false,
        autoLoginStatus: RequestStatus.failed,
      };
    case getType(autoLogin.cancel):
      return {
        ...state,
        isLoggedin: false,
        autoLoginStatus: RequestStatus.completed,
      };
    case getType(autoLogin.success):
      return {
        ...state,
        autoLoginStatus: RequestStatus.completed,
        isLoggedin: true,
        user: action.payload,
        token: action.payload.token,
        errors: undefined,
      };
    case getType(userRegistration.request):
      return {
        ...state,
        userRegistrationStatus: RequestStatus.fetching,
        registrationErrors: undefined,
      };
    case getType(userRegistration.failure):
      return {
        ...state,
        userRegistrationStatus: RequestStatus.failed,
        registrationErrors: action.payload,
      };
    case getType(userRegistration.success):
      return {
        ...state,
        userRegistrationStatus: RequestStatus.completed,
        isLoggedin: true,
        user: action.payload,
        token: action.payload.token,
        registrationErrors: undefined,
      };
    case getType(userActions.updateUser.request):
      return {
        ...state,
        updateUserStatus: RequestStatus.fetching,
        updateUserErrors: undefined,
      };
    case getType(userActions.updateUser.failure):
      return {
        ...state,
        updateUserStatus: RequestStatus.failed,
        updateUserErrors: action.payload,
      };
    case getType(userActions.updateUser.success):
      return {
        ...state,
        updateUserStatus: RequestStatus.completed,
        user: action.payload,
      };
    case getType(userActions.logout):
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
