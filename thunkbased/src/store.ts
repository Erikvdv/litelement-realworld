import {
    createStore,
    compose,
    applyMiddleware,
    combineReducers,
    Reducer,
    StoreEnhancer,
} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

import app, { AppState } from './root/root.reducer';
import { AppAction } from './root/root.actions';
import { HomeState } from './home/home.reducer';
import { ArticleListAction } from './shared/article-list/article-list.actions';
import { ArticleListState } from './shared/article-list/article-list.reducer';
import { ArticleAction } from './article/article.actions';
import { ArticleState } from './article/article.reducer';
import { HomeAction } from './home/home.actions';
import { RegistrationState } from './register/registration.reducers';
import { RegistrationAction } from './register/registration.actions';
import { LoginState } from './login/login.reducer';
import { LoginAction } from './login/login.actions';
import { EditorAction } from './editor';
import { EditorState } from './editor/editor.reducer';
import { ProfileAction } from './profile/profile.actions';
import { ProfileState } from './profile/profile.reducer';

declare global {
    interface Window {
        process?: Object;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// Overall state extends static states and partials lazy states.
export interface RootState {
    app: AppState;
    login: LoginState;
    home?: HomeState;
    articleList?: ArticleListState;
    article?: ArticleState;
    editor?: EditorState;
    registration?: RegistrationState;
    profile?: ProfileState;
}

export type RootAction =
    | AppAction
    | HomeAction
    | ArticleListAction
    | ArticleAction
    | RegistrationAction
    | LoginAction
    | ProfileAction
    | EditorAction;

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose: <Ext0, Ext1, StateExt0, StateExt1>(
    f1: StoreEnhancer<Ext0, StateExt0>,
    f2: StoreEnhancer<Ext1, StateExt1>,
) => StoreEnhancer<Ext0 & Ext1, StateExt0 & StateExt1> =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Initializes the Redux store with a lazyReducerEnhancer (so that you can
// lazily add reducers after the store has been created) and redux-thunk (so
// that you can dispatch async actions). See the "Redux and state management"
// section of the wiki for more details:
// https://github.com/Polymer/pwa-starter-kit/wiki/4.-Redux-and-state-management
export const store = createStore(
    state => state as Reducer<RootState, RootAction>,
    devCompose(
        lazyReducerEnhancer(combineReducers),
        applyMiddleware(thunk as ThunkMiddleware<RootState, RootAction>),
    ),
);

// Initially loaded reducers.
store.addReducers({
    app,
});
