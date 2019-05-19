import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { ArticleListType, ArticleListQuery } from '../models';

// Action Types
export const UPDATE_PAGE = 'UPDATE_PAGE';

// Actions Interfaces
export interface AppActionUpdatePage extends Action<'UPDATE_PAGE'> { page: string; }

export type AppAction = AppActionUpdatePage;

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>;

// Actions
const updatePage: ActionCreator<AppActionUpdatePage> = (page: string) => {
  return {
    type: UPDATE_PAGE,
    page
  };
};

const loadPage: ActionCreator<ThunkResult> = (page: string) => (dispatch) => {
  switch (page) {
    case 'home':
      import('../containers/app-home').then((module) => {
        const config: ArticleListQuery = { type: ArticleListType.all, filters: { limit: 10, offset: 0 } };
        dispatch(module.fetchArticleList(config));
        dispatch(module.fetchTags());
      });
      break;
  }
  dispatch(updatePage(page));
};

export const navigate: ActionCreator<ThunkResult> = (path: string) => (dispatch) => {
  // Extract the page name from path.
  const page = path === '/' ? 'home' : path.slice(1);

  dispatch(loadPage(page));
};


