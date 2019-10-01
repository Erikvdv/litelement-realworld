import { createAsyncAction, createStandardAction } from 'typesafe-actions';
// import { Errors } from '../../models';
import { User, UserRegistration } from '../../models/user.model';
import { Errors } from '../../models';
import { UserLogin } from '../../components/login/login.models';

export const autoLogin = createAsyncAction(
  'AUTO_LOGIN_REQUEST',
  'AUTO_LOGIN_SUCCESS',
  'AUTO_LOGIN_FAILURE',
  'AUTO_LOGIN_CANCEL',
)<void, User, void, void>();

export const userLogin = createAsyncAction(
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE',
)<UserLogin, User, Errors>();

export const userRegistration = createAsyncAction(
  'REGISTRATION_REQUEST',
  'REGISTRATION_SUCCESS',
  'REGISTRATION_FAILURE',
)<UserRegistration, User, Errors>();

export const updateUser = createAsyncAction(
  'UPDATE_USER_REQUEST',
  'UPDATE_USER_SUCCESS',
  'UPDATE_USER_FAILURE',
)<User, User, Errors>();

export const autoLoginInitiate = createStandardAction('AUTO_LOGIN_INITIATE')<
  void
>();

export const logout = createStandardAction('LOGOUT')<void>();
