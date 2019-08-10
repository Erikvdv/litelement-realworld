import { store, RootState } from '../store';
import login from './login.reducer';
import { loginRefresh } from './login.actions';
import { LoginContainer } from './login.container';

store.addReducers({
  login,
});

export { loginRefresh, LoginContainer };
export const isLoggedIn = (state: RootState) => state.login.isLoggedIn;
export const getToken = (state: RootState) => state.login.user.token;
export const userName = (state: RootState) => state.login.user.username;
export const getUser = (state: RootState) => state.login.user;
export const loginStateSelector = (state: RootState) => state.login;
