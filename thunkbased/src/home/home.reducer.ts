import { Reducer } from 'redux';
import {
  LOAD_TAGS_REQUESTED,
  LOAD_TAGS_COMPLETED,
  LOAD_TAGS_FAILED,
  SET_ARTICLES_QUERY,
} from './home.actions';
import { RootAction, RootState } from '../store';
import { ArticleListQuery, ArticleListType } from '../models';

export interface HomeState {
  tags: string[];
  failure: boolean;
  isFetching: boolean;
  articleListQuery: ArticleListQuery;
}

const initialState: HomeState = {
  tags: [],
  failure: false,
  isFetching: false,
  articleListQuery: {
    type: ArticleListType.all,
    filters: { limit: 10, offset: 0 },
  },
};

const home: Reducer<HomeState, RootAction> = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TAGS_REQUESTED:
      return {
        ...state,
        isFetching: true,
        failure: false,
      };
    case LOAD_TAGS_FAILED:
      return {
        ...state,
        isFetching: false,
        failure: true,
      };
    case LOAD_TAGS_COMPLETED:
      return {
        ...state,
        isFetching: false,
        tags: action.tags,
      };
    case SET_ARTICLES_QUERY:
      return {
        ...state,
        articleListQuery: action.query,
      };
    default:
      return state;
  }
};

export default home;

export const homeSelector = (state: RootState) => state.home;
