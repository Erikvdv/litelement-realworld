import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store';
import { Article, ArticleListQuery, ArticleListType } from '../../models';
import { API_ROOT } from '../../constants';

// Action Types
export const LOAD_ARTICLE_LIST_REQUESTED = 'LOAD_ARTICLE_LIST_REQUESTED';
export const LOAD_ARTICLE_LIST_COMPLETED = 'LOAD_ARTICLE_LIST_COMPLETED';
export const LOAD_ARTICLE_LIST_FAILED = 'LOAD_ARTICLE_LIST_FAILED';
export const ARTICLE_LIST_SET_PAGE = 'ARTICLE_LIST_SET_PAGE';

// Actions Interfaces
export interface AppActionLoadArticleListRequested extends Action<'LOAD_ARTICLE_LIST_REQUESTED'> { config: ArticleListQuery; }
export interface AppActionLoadArticleListCompleted extends Action<'LOAD_ARTICLE_LIST_COMPLETED'> {
    articles: Article[]; articleCount: number; }

export interface AppActionLoadArticleListFailed extends Action<'LOAD_ARTICLE_LIST_FAILED'> {}

export interface AppActionArticleListSetPage extends Action<'ARTICLE_LIST_SET_PAGE'> { page: number; }

export type ArticleListAction =
    AppActionLoadArticleListRequested |
    AppActionLoadArticleListCompleted |
    AppActionLoadArticleListFailed |
    AppActionArticleListSetPage;

type ThunkResult = ThunkAction<void, RootState, undefined, ArticleListAction>;


// Actions
const loadArticleListFailed: ActionCreator<AppActionLoadArticleListFailed> = () => {
    return {
        type: LOAD_ARTICLE_LIST_FAILED
    };
};

const loadArticleListCompleted: ActionCreator<AppActionLoadArticleListCompleted> = (articles: Article[], articleCount: number) => {
    return {
      type: LOAD_ARTICLE_LIST_COMPLETED,
      articles,
      articleCount
    };
  };

const loadArticleListRequested: ActionCreator<AppActionLoadArticleListRequested> = (config: ArticleListQuery) => {
    return {
        type: LOAD_ARTICLE_LIST_REQUESTED,
        config
    };
};

const articleListSetPageAction: ActionCreator<AppActionArticleListSetPage> = (page: number) => {
    return {
        type: ARTICLE_LIST_SET_PAGE,
        page
    };
};


interface FetchArticleListResult {
    articles: Article[];
    articlesCount: number;

}

// async action processors
export const fetchArticleList: ActionCreator<ThunkResult> = (config: ArticleListQuery) => (dispatch) => {
    dispatch(loadArticleListRequested(config));
    fetch(`${API_ROOT}/articles?limit=${config.filters.limit}&offset=${config.filters.offset}`)
        .then(res => res.json())
        .then((data: FetchArticleListResult) => dispatch(loadArticleListCompleted(data.articles, data.articlesCount)))
        .catch(() => dispatch(loadArticleListFailed()));
};

export const articleListSetPage: ActionCreator<ThunkResult> = (page: number, pageSize: number) => (dispatch) => {
    dispatch(articleListSetPageAction(page));
    const config: ArticleListQuery = {
        type: ArticleListType.all,
        filters: {
            limit: pageSize,
            offset: (page - 1) * pageSize
        }
    };
    dispatch(fetchArticleList(config));
};
