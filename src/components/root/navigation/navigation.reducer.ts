import { createReducer } from 'typesafe-actions';
import { navigate } from './navigation.actions';

export enum RootRoute {
  home = 'home',
  article = 'article',
  register = 'register',
  login = 'login',
  editor = 'editor',
  profile = 'profile',
  settings = 'settings',
}

export interface RootRouteState {
  readonly rootRoute: RootRoute;
}

const initialState = {
  rootRoute: RootRoute.home,
};

export const navigationReducer = createReducer(initialState).handleAction(
  navigate,
  (state, action) => {
    return { ...state, rootRoute: action.payload };
  },
);

export default navigationReducer;
export type NavigationState = ReturnType<typeof navigationReducer>;
