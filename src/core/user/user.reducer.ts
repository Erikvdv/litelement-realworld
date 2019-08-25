import { ActionType, getType } from 'typesafe-actions';
import { userLogin, autoLogin } from './user.actions';
import { RequestStatus } from '../../models/request-status.model';
import { User } from '../../models/user.model';
import { Errors } from '../../models';
import * as userActions from './user.actions';

type UserAction = ActionType<typeof userActions>;

export interface UserState {
  isLoggedin: boolean;
  userLoginStatus: RequestStatus;
  autoLoginStatus: RequestStatus;
  user?: User;
  errors?: Errors;
}

const initialState: UserState = {
  isLoggedin: false,
  userLoginStatus: RequestStatus.notStarted,
  autoLoginStatus: RequestStatus.notStarted,
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
        autoLoginStatus: RequestStatus.failed,
      };
    case getType(autoLogin.success):
      return {
        ...state,
        autoLoginStatus: RequestStatus.completed,
        isLoggedin: true,
        user: action.payload,
        errors: undefined,
      };
    default:
      return state;
  }
};
