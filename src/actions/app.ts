import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { ArticleListType, ArticleListQuery } from '../models';

// Action Types
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';

// Actions Interfaces
export interface AppActionUpdatePage extends Action<'UPDATE_PAGE'> {page: string};
export interface AppActionUpdateOffline extends Action<'UPDATE_OFFLINE'> {offline: boolean};

export type AppAction = AppActionUpdatePage | AppActionUpdateOffline;

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>;


export const navigate: ActionCreator<ThunkResult> = (path: string) => (dispatch) => {
  // Extract the page name from path.
  const page = path === '/' ? 'home' : path.slice(1);

  dispatch(loadPage(page));


};


const loadPage: ActionCreator<ThunkResult> = (page: string) => (dispatch) => {
  switch(page) {
    case 'home':
      import('../containers/app-home').then((module) => {
        const config: ArticleListQuery = {type: ArticleListType.all, filters: {limit: 10, offset: 0}};
        dispatch(module.fetchArticleList(config));
        dispatch(module.fetchTags());
      });
      break;
  }

  dispatch(updatePage(page));
};

const updatePage: ActionCreator<AppActionUpdatePage> = (page: string) => {
  return {
    type: UPDATE_PAGE,
    page
  };
};


export const updateOffline: ActionCreator<ThunkResult> = (offline: boolean) => (dispatch, getState) => {
  // Show the snackbar only if offline status changes.
  if (offline !== getState().app!.offline) {

  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  });
};

