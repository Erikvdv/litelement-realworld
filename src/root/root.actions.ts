import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import page from 'page';
import { RootRoute } from './root.reducer';

// Action Types
export const UPDATE_PAGE = 'UPDATE_PAGE';

// Actions Interfaces
export interface AppActionUpdatePage extends Action<'UPDATE_PAGE'> {
  route: RootRoute;
}

export type AppAction = AppActionUpdatePage;

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>;

// Actions
const updatePage: ActionCreator<AppActionUpdatePage> = (route: RootRoute) => {
  return {
    type: UPDATE_PAGE,
    route,
  };
};

const goToHomePage: ActionCreator<ThunkResult> = () => dispatch => {
  import('../home').then(() => {
    dispatch(updatePage(RootRoute.home));
  });
};

const goToArticlePage: ActionCreator<ThunkResult> = (
  articleId: string,
  token: string,
) => dispatch => {
  import('../article').then(module => {
    dispatch(module.fetchArticle(articleId, token));
    dispatch(updatePage(RootRoute.article));
  });
};

const goToEditorPage: ActionCreator<ThunkResult> = (
  articleId: string,
  token: string,
) => dispatch => {
  import('../editor').then(module => {
    if (articleId !== undefined) {
      dispatch(module.fetchArticle(articleId, token));
    } else {
      dispatch(module.reset());
    }
    dispatch(updatePage(RootRoute.editor));
  });
};

const goToProfilePage: ActionCreator<ThunkResult> = (
  username: string,
) => dispatch => {
  import('../profile').then(module => {
    dispatch(module.fetchProfile(username));
    dispatch(updatePage(RootRoute.profile));
  });
};

const goToRegistrationPage: ActionCreator<ThunkResult> = () => dispatch => {
  import('../register').then(() => {
    dispatch(updatePage(RootRoute.register));
  });
};

const goToLoginPage: ActionCreator<ThunkResult> = () => dispatch => {
  import('../login').then(() => {
    dispatch(updatePage(RootRoute.login));
  });
};

const goToSettingsPage: ActionCreator<ThunkResult> = () => dispatch => {
  import('../profile').then(() => {
    dispatch(updatePage(RootRoute.settings));
  });
};

export const navigate: ActionCreator<ThunkResult> = (
  token: string,
) => dispatch => {
  page.base('');
  page('/home', () => dispatch(goToHomePage()));
  page('/article/:id', ctx => dispatch(goToArticlePage(ctx.params.id, token)));
  page('/editor', () => dispatch(goToEditorPage()));
  page('/editor/:id', ctx => dispatch(goToEditorPage(ctx.params.id, token)));
  page('/profile/:id', ctx => dispatch(goToProfilePage(ctx.params.id)));
  page('/register', () => dispatch(goToRegistrationPage()));
  page('/login', () => dispatch(goToLoginPage()));
  page('/settings', () => dispatch(goToSettingsPage()));
  page('*', () => dispatch(goToHomePage()));
  page();
};
