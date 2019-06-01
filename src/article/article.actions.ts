import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { Article } from '../models';
import { API_ROOT } from '../constants';

// Action Types
export const LOAD_ARTICLE_REQUESTED = 'LOAD_ARTICLE_REQUESTED';
export const LOAD_ARTICLE_COMPLETED = 'LOAD_ARTICLE_COMPLETED';
export const LOAD_ARTICLE_FAILED = 'LOAD_ARTICLE_FAILED';

// Actions Interfaces
export interface AppActionLoadArticleRequested extends Action<'LOAD_ARTICLE_REQUESTED'> { articleId: string; }
export interface AppActionLoadArticleCompleted extends Action<'LOAD_ARTICLE_COMPLETED'> { article: Article; }
export interface AppActionLoadArticleFailed extends Action<'LOAD_ARTICLE_FAILED'> {}

export type ArticleAction =
    AppActionLoadArticleRequested |
    AppActionLoadArticleCompleted |
    AppActionLoadArticleFailed;

type ThunkResult = ThunkAction<void, RootState, undefined, ArticleAction>;


// Actions
const loadArticleFailed: ActionCreator<AppActionLoadArticleFailed> = () => {
    return {
        type: LOAD_ARTICLE_FAILED
    };
};

const loadArticleCompleted: ActionCreator<AppActionLoadArticleCompleted> = (article: Article) => {
    return {
      type: LOAD_ARTICLE_COMPLETED,
      article
    };
  };

const loadArticleRequested: ActionCreator<AppActionLoadArticleRequested> = (articleId: string) => {
    return {
        type: LOAD_ARTICLE_REQUESTED,
        articleId
    };
};

interface FetchArticleResult {
    article: Article;
}

// async action processors
export const fetchArticle: ActionCreator<ThunkResult> = (articleId: string) => (dispatch) => {
    dispatch(loadArticleRequested(articleId));
    fetch(`${API_ROOT}/articles/${articleId}`)
        .then(res => res.json())
        .then((data: FetchArticleResult) => dispatch(loadArticleCompleted(data.article)))
        .catch(() => dispatch(loadArticleFailed()));
};
