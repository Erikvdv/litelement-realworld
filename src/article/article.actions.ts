import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { Article } from '../models';
import { API_ROOT } from '../constants';

// Action Types
export const LOAD_ARTICLE_REQUESTED = 'LOAD_ARTICLE_REQUESTED';
export const LOAD_ARTICLE_COMPLETED = 'LOAD_ARTICLE_COMPLETED';
export const LOAD_ARTICLE_FAILED = 'LOAD_ARTICLE_FAILED';
export const LOAD_COMMENTS_REQUESTED = 'LOAD_COMMENTS_REQUESTED';
export const LOAD_COMMENTS_COMPLETED = 'LOAD_COMMENTS_COMPLETED';
export const LOAD_COMMENTS_FAILED = 'LOAD_COMMENTS_FAILED';

// Actions Interfaces
export interface ActionLoadArticleRequested extends Action<'LOAD_ARTICLE_REQUESTED'> { articleSlug: string; }
export interface ActionLoadArticleCompleted extends Action<'LOAD_ARTICLE_COMPLETED'> { article: Article; }
export interface ActionLoadArticleFailed extends Action<'LOAD_ARTICLE_FAILED'> {}
export interface ActionLoadCommentsRequested extends Action<'LOAD_COMMENTS_REQUESTED'> { articleSlug: string; }
export interface ActionLoadCommentsCompleted extends Action<'LOAD_COMMENTS_COMPLETED'> { comments: Comment[]; }
export interface ActionLoadCommentsFailed extends Action<'LOAD_COMMENTS_FAILED'> {}

export type ArticleAction =
    ActionLoadArticleRequested |
    ActionLoadArticleCompleted |
    ActionLoadArticleFailed |
    ActionLoadCommentsRequested |
    ActionLoadCommentsCompleted |
    ActionLoadCommentsFailed;

type ThunkResult = ThunkAction<void, RootState, undefined, ArticleAction>;


// Actions
const loadArticleFailed: ActionCreator<ActionLoadArticleFailed> = () => {
    return { type: LOAD_ARTICLE_FAILED };
};

const loadArticleCompleted: ActionCreator<ActionLoadArticleCompleted> = (article: Article) => {
    return { type: LOAD_ARTICLE_COMPLETED, article };
};

const loadArticleRequested: ActionCreator<ActionLoadArticleRequested> = (articleSlug: string) => {
    return { type: LOAD_ARTICLE_REQUESTED, articleSlug };
};

const loadCommentsFailed: ActionCreator<ActionLoadCommentsFailed> = () => {
    return { type: LOAD_COMMENTS_FAILED };
};

const loadCommentsCompleted: ActionCreator<ActionLoadCommentsCompleted> = (comments: Comment[]) => {
    return { type: LOAD_COMMENTS_COMPLETED, comments };
};

const loadCommentsRequested: ActionCreator<ActionLoadCommentsRequested> = (articleSlug: string) => {
    return { type: LOAD_COMMENTS_REQUESTED, articleSlug };
};

interface FetchArticleResult {
    article: Article;
}

interface FetchCommentsResult {
    comments: Comment[];
}

// async action processors
export const fetchArticle: ActionCreator<ThunkResult> = (articleSlug: string) => (dispatch) => {
    dispatch(loadArticleRequested(articleSlug));
    fetch(`${API_ROOT}/articles/${articleSlug}`)
        .then(res => res.json())
        .then((data: FetchArticleResult) => dispatch(loadArticleCompleted(data.article)))
        .catch(() => dispatch(loadArticleFailed()));
};

export const fetchComments: ActionCreator<ThunkResult> = (articleSlug: string) => (dispatch) => {
    dispatch(loadCommentsRequested(articleSlug));
    fetch(`${API_ROOT}/articles/${articleSlug}/comments`)
        .then(res => res.json())
        .then((data: FetchCommentsResult) => dispatch(loadCommentsCompleted(data.comments)))
        .catch(() => dispatch(loadCommentsFailed()));
};
