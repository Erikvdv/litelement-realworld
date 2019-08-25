import {
  createStore,
  applyMiddleware,
  StoreEnhancer,
  combineReducers,
  compose,
} from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './root.reducer';
import rootEpic from './root.epic';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer';
import { RootAction, RootState } from 'typesafe-actions';

declare global {
  interface Window {
    process?: Object;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const devCompose: <Ext0, Ext1, StateExt0, StateExt1>(
  f1: StoreEnhancer<Ext0, StateExt0>,
  f2: StoreEnhancer<Ext1, StateExt1>,
) => StoreEnhancer<Ext0 & Ext1, StateExt0 & StateExt1> =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState
>();

// configure middlewares
const middlewares = [epicMiddleware];
// compose enhancers
const enhancer = devCompose(
  lazyReducerEnhancer(combineReducers),
  applyMiddleware(...middlewares),
);

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer, initialState, enhancer);

epicMiddleware.run(rootEpic);

// export store singleton instance
export default store;
