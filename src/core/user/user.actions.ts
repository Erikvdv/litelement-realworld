import { createAsyncAction } from 'typesafe-actions';
// import { Errors } from '../../models';
import { User } from '../../models/user.model';
import { Errors } from '../../models';
import { UserLogin } from '../../components/login/login.models';

export const autoLogin = createAsyncAction(
  'AUTO_LOGIN_REQUEST',
  'AUTO_LOGIN_SUCCESS',
  'AUTO_LOGIN_FAILURE',
)<void, User, undefined>();

export const userLogin = createAsyncAction(
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
)<UserLogin, User, Errors>();
