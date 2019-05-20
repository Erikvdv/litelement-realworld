import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { ArticleListType, ArticleListQuery } from '../models';
import * as pagejs from 'page';
import { rootRoute } from '../reducers/app-root';
const router = pagejs.default;

// Action Types
export const UPDATE_PAGE = 'UPDATE_PAGE';

// Actions Interfaces
export interface AppActionUpdatePage extends Action<'UPDATE_PAGE'> { route: rootRoute; }

export type AppAction = AppActionUpdatePage;

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>;

// Actions
const updatePage: ActionCreator<AppActionUpdatePage> = (route: rootRoute) => {
  return {
    type: UPDATE_PAGE,
    route
  };
};



const goToHomePage: ActionCreator<ThunkResult> = () => (dispatch) => {
  import('../containers/app-home').then((module) => {
    const config: ArticleListQuery = { type: ArticleListType.all, filters: { limit: 10, offset: 0 } };
    dispatch(module.fetchArticleList(config));
    dispatch(module.fetchTags());
    dispatch(updatePage('home'));
  });
};

const goToArticlePage: ActionCreator<ThunkResult> = (articleId: string) => (dispatch) => {
  import('../containers/app-article').then((module) => {
    dispatch(module.fetchArticle(articleId));
    dispatch(updatePage('article'));
  });
};

export const navigate: ActionCreator<ThunkResult> = () => (dispatch) => {
  router.base('');
  router('/home', () => dispatch(goToHomePage()));
  router('/article/:id', (ctx) => dispatch(goToArticlePage(ctx.params.id)));
  router('*', () => dispatch(goToHomePage()));
  router();
};


