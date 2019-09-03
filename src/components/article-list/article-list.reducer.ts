import * as articleListActions from './article-list.actions';
import { ActionType, getType } from 'typesafe-actions';
import { RequestStatus } from '../../models/request-status.model';
import { Article } from '../../models/article.model';
import {
  ArticleListQuery,
  ArticleListType,
} from '../../models/article-list-query.model';

type ArticleListAction = ActionType<typeof articleListActions>;

export interface ArticleListState {
  articleList: Article[];
  articleListQuery: ArticleListQuery;
  articleCount: number;
  failure: boolean;
  isFetching: boolean;
  activePage: number;
  pageSize: number;
  favoriteStatus: RequestStatus;
}

const initialState: ArticleListState = {
  articleList: [],
  articleListQuery: {
    type: ArticleListType.all,
    filters: { limit: 10 },
  },
  articleCount: 0,
  failure: false,
  isFetching: false,
  activePage: 1,
  pageSize: 10,
  favoriteStatus: RequestStatus.notStarted,
};

export default (
  state: ArticleListState = initialState,
  action: ArticleListAction,
) => {
  switch (action.type) {
    case getType(articleListActions.articleListFetch.request):
      return {
        ...state,
        isFetching: true,
        failure: false,
        activePage: action.payload.filters.offset
          ? action.payload.filters.offset / action.payload.filters.limit + 1
          : 1,
      };
    case getType(articleListActions.articleListFetch.failure):
      return {
        ...state,
        isFetching: false,
        failure: true,
      };
    case getType(articleListActions.articleListFetch.success):
      return {
        ...state,
        isFetching: false,
        articleList: action.payload.articles,
        articleCount: action.payload.articlesCount,
      };
    case getType(articleListActions.articleListSetQuery):
      return {
        ...state,
        articleListQuery: action.payload,
      };
    case getType(articleListActions.articleListSetPage):
      return {
        ...state,
        articleListQuery: {
          ...state.articleListQuery,
          filters: {
            ...state.articleListQuery.filters,
            offset: state.articleListQuery.filters.limit * (action.payload - 1),
          },
        },
      };
    case getType(articleListActions.articleSetFavorite.request):
      return {
        ...state,
        favoriteStatus: RequestStatus.fetching,
      };
    case getType(articleListActions.articleSetFavorite.success):
      return {
        ...state,
        favoriteStatus: RequestStatus.completed,
        articleList: state.articleList.map(item =>
          item.slug === action.payload.slug ? { ...action.payload } : item,
        ),
      };
    case getType(articleListActions.articleSetFavorite.failure):
      return {
        ...state,
        favoriteStatus: RequestStatus.failed,
      };

    case getType(articleListActions.articleUnsetFavorite.request):
      return {
        ...state,
        favoriteStatus: RequestStatus.fetching,
      };
    case getType(articleListActions.articleUnsetFavorite.success):
      return {
        ...state,
        favoriteStatus: RequestStatus.completed,
        articleList: state.articleList.map(item =>
          item.slug === action.payload.slug ? { ...action.payload } : item,
        ),
      };
    case getType(articleListActions.articleUnsetFavorite.failure):
      return {
        ...state,
        favoriteStatus: RequestStatus.failed,
      };
    default:
      return state;
  }
};
