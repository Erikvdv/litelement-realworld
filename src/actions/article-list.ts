import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { Article, ArticleListQuery } from '../models';
import { API_ROOT } from '../constants';

// Action Types
export const LOAD_ARTICLE_LIST_REQUESTED = 'LOAD_ARTICLE_LIST_REQUESTED';
export const LOAD_ARTICLE_LIST_COMPLETED = 'LOAD_ARTICLE_LIST_COMPLETED';
export const LOAD_ARTICLE_LIST_FAILED = 'LOAD_ARTICLE_LIST_FAILED';

// Actions Interfaces
export interface AppActionLoadArticleListRequested extends Action<'LOAD_ARTICLE_LIST_REQUESTED'> { config: ArticleListQuery };
export interface AppActionLoadArticleListCompleted extends Action<'LOAD_ARTICLE_LIST_COMPLETED'> { articles: Article[] };
export interface AppActionLoadArticleListFailed extends Action<'LOAD_ARTICLE_LIST_FAILED'> {};

export type ArticleListAction = 
    AppActionLoadArticleListRequested | 
    AppActionLoadArticleListCompleted | 
    AppActionLoadArticleListFailed;

type ThunkResult = ThunkAction<void, RootState, undefined, ArticleListAction>;


// Actions
const loadArticleListFailed: ActionCreator<AppActionLoadArticleListFailed> = () => {
    return {
        type: LOAD_ARTICLE_LIST_FAILED
    };
};

const loadArticleListCompleted: ActionCreator<AppActionLoadArticleListCompleted> = (articles: Article[]) => {
    return {
      type: LOAD_ARTICLE_LIST_COMPLETED,
      articles
    };
  };

const loadArticleListRequested: ActionCreator<AppActionLoadArticleListRequested> = (config: ArticleListQuery) => {
    return {
        type: LOAD_ARTICLE_LIST_REQUESTED,
        config
    };
};


interface fetchArticleListResult {
    articles: Article[];
    articlesCount: number;

}

// async action processors
export const fetchArticleList: ActionCreator<ThunkResult> = (config: ArticleListQuery) => (dispatch) => {
    dispatch(loadArticleListRequested(config));
    fetch(`${API_ROOT}/articles?limit=${config.filters.limit}&offset=${config.filters.offset}`)
        .then(res => res.json())
        .then((data: fetchArticleListResult) => dispatch(loadArticleListCompleted(data.articles)))
        .catch(() => dispatch(loadArticleListFailed()));
};
