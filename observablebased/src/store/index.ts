import {
  createStore,
  applyMiddleware,
  StoreEnhancer,
  combineReducers,
  compose,
  // Reducer,
} from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootEpic from './root.epic';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer';
import { RootAction, RootState } from 'typesafe-actions';
import rootReducer from './root.reducer';

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

// export interface RootState {
//   navigation: NavigationState;
//   user: UserState;
//   home: HomeState;
//   article: ArticleState;
//   articleList?: ArticleListState;
// }

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer, initialState, enhancer);

// const store = createStore(
//   state => state as Reducer<RootState, RootAction>,
//   initialState,
//   enhancer,
// );

// Initially loaded reducers.
// store.addReducers({
//   user: userReducer,
// });

epicMiddleware.run(rootEpic);

// export store singleton instance
export default store;
