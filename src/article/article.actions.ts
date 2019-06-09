import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { Article } from '../models';
import { API_ROOT } from '../constants';
import { Comment } from '../models/comment.model';

// Action Types
export const LOAD_ARTICLE_REQUESTED = 'LOAD_ARTICLE_REQUESTED';
export const LOAD_ARTICLE_COMPLETED = 'LOAD_ARTICLE_COMPLETED';
export const LOAD_ARTICLE_FAILED = 'LOAD_ARTICLE_FAILED';
export const LOAD_COMMENTS_REQUESTED = 'LOAD_COMMENTS_REQUESTED';
export const LOAD_COMMENTS_COMPLETED = 'LOAD_COMMENTS_COMPLETED';
export const LOAD_COMMENTS_FAILED = 'LOAD_COMMENTS_FAILED';
export const DELETE_COMMENT_REQUESTED = 'DELETE_COMMENT_REQUESTED';
export const DELETE_COMMENT_COMPLETED = 'DELETE_COMMENT_COMPLETED';
export const DELETE_COMMENT_FAILED = 'DELETE_COMMENT_FAILED';

// Actions Interfaces
export interface ActionLoadArticleRequested extends Action<'LOAD_ARTICLE_REQUESTED'> { articleSlug: string; }
export interface ActionLoadArticleCompleted extends Action<'LOAD_ARTICLE_COMPLETED'> { article: Article; }
export interface ActionLoadArticleFailed extends Action<'LOAD_ARTICLE_FAILED'> { }
export interface ActionLoadCommentsRequested extends Action<'LOAD_COMMENTS_REQUESTED'> { articleSlug: string; }
export interface ActionLoadCommentsCompleted extends Action<'LOAD_COMMENTS_COMPLETED'> { comments: Comment[]; }
export interface ActionLoadCommentsFailed extends Action<'LOAD_COMMENTS_FAILED'> { }
export interface ActionDeleteCommentRequested extends Action<'DELETE_COMMENT_REQUESTED'> { commentId: number; }
export interface ActionDeleteCommentCompleted extends Action<'DELETE_COMMENT_COMPLETED'> { commentId: number; }
export interface ActionDeleteCommentFailed extends Action<'DELETE_COMMENT_FAILED'> { }

export type ArticleAction =
    ActionLoadArticleRequested | ActionLoadArticleCompleted | ActionLoadArticleFailed |
    ActionLoadCommentsRequested | ActionLoadCommentsCompleted | ActionLoadCommentsFailed |
    ActionDeleteCommentRequested | ActionDeleteCommentCompleted | ActionDeleteCommentFailed
    ;

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

const deleteCommentFailed: ActionCreator<ActionDeleteCommentFailed> = () => {
    return { type: DELETE_COMMENT_FAILED };
};

const deleteCommentCompleted: ActionCreator<ActionDeleteCommentCompleted> = (commentId: number) => {
    return { type: DELETE_COMMENT_COMPLETED, commentId };
};

const deleteCommentRequested: ActionCreator<ActionDeleteCommentRequested> = (commentId: number) => {
    return { type: DELETE_COMMENT_REQUESTED, commentId };
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

export const deleteComment: ActionCreator<ThunkResult> =
    (articleSlug: string, commentId: number, token: string) => async (dispatch) => {

        let headers: { [key: string]: string } = {};
        if (token) { headers = { 'Authorization': `Token ${token}` }; }

        dispatch(deleteCommentRequested(commentId));

        try {
            const res = await fetch(`${API_ROOT}/articles/${articleSlug}/comments/${commentId}`, {
                method: 'delete', headers: headers
            });
            if (res.status === 200) {
                dispatch(deleteCommentCompleted(commentId));
            } else {
                dispatch(deleteCommentFailed());
            }
        } catch (err) {
            dispatch(deleteCommentFailed());
        }
    };

