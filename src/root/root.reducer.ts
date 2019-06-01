/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { Reducer } from 'redux';
import {
  UPDATE_PAGE
} from './root.actions';
import { RootAction } from '../store';

export interface AppState {
  route: rootRoute;
}

export enum rootRoute {
  home = 'home',
  article = 'article',
  register = 'register',
  login = 'login'
}


const INITIAL_STATE: AppState = {
  route: rootRoute.home
};

const appRoot: Reducer<AppState, RootAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        route: action.route
      };
    default:
      return state;
  }
};

export default appRoot;
