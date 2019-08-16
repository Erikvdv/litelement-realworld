import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { API_ROOT } from '../constants';
import { Article, Errors } from '../models';
import { Comment } from '../models/comment.model';
import { RootState } from '../store';
import { navigate } from '../root/root.actions';

// Action Types
export const LOAD_ARTICLE_REQUESTED = 'LOAD_ARTICLE_REQUESTED';
export const LOAD_ARTICLE_COMPLETED = 'LOAD_ARTICLE_COMPLETED';
export const LOAD_ARTICLE_FAILED = 'LOAD_ARTICLE_FAILED';
export const LOAD_COMMENTS_REQUESTED = 'LOAD_COMMENTS_REQUESTED';
export const LOAD_COMMENTS_COMPLETED = 'LOAD_COMMENTS_COMPLETED';
export const LOAD_COMMENTS_FAILED = 'LOAD_COMMENTS_FAILED';
export const DELETE_ARTICLE_REQUESTED = 'DELETE_ARTICLE_REQUESTED';
export const DELETE_ARTICLE_COMPLETED = 'DELETE_ARTICLE_COMPLETED';
export const DELETE_ARTICLE_FAILED = 'DELETE_ARTICLE_FAILED';
export const DELETE_COMMENT_REQUESTED = 'DELETE_COMMENT_REQUESTED';
export const DELETE_COMMENT_COMPLETED = 'DELETE_COMMENT_COMPLETED';
export const DELETE_COMMENT_FAILED = 'DELETE_COMMENT_FAILED';
export const ADD_COMMENT_REQUESTED = 'ADD_COMMENT_REQUESTED';
export const ADD_COMMENT_COMPLETED = 'ADD_COMMENT_COMPLETED';
export const ADD_COMMENT_FAILED = 'ADD_COMMENT_FAILED';

// Actions Interfaces
export interface ActionLoadArticleRequested
    extends Action<'LOAD_ARTICLE_REQUESTED'> {
    articleSlug: string;
}
export interface ActionLoadArticleCompleted
    extends Action<'LOAD_ARTICLE_COMPLETED'> {
    article: Article;
}
export interface ActionLoadArticleFailed
    extends Action<'LOAD_ARTICLE_FAILED'> {}
export interface ActionLoadCommentsRequested
    extends Action<'LOAD_COMMENTS_REQUESTED'> {
    articleSlug: string;
}
export interface ActionLoadCommentsCompleted
    extends Action<'LOAD_COMMENTS_COMPLETED'> {
    comments: Comment[];
}
export interface ActionLoadCommentsFailed
    extends Action<'LOAD_COMMENTS_FAILED'> {}

export interface ActionDeleteArticleRequested
    extends Action<'DELETE_ARTICLE_REQUESTED'> {
    articleSlug: string;
}
export interface ActionDeleteArticleCompleted
    extends Action<'DELETE_ARTICLE_COMPLETED'> {
    articleSlug: string;
}
export interface ActionDeleteArticleFailed
    extends Action<'DELETE_ARTICLE_FAILED'> {}

export interface ActionDeleteCommentRequested
    extends Action<'DELETE_COMMENT_REQUESTED'> {
    commentId: number;
}
export interface ActionDeleteCommentCompleted
    extends Action<'DELETE_COMMENT_COMPLETED'> {
    commentId: number;
}
export interface ActionDeleteCommentFailed
    extends Action<'DELETE_COMMENT_FAILED'> {}
export interface ActionAddCommentRequested
    extends Action<'ADD_COMMENT_REQUESTED'> {
    articleSlug: string;
    commentBody: string;
}
export interface ActionAddCommentCompleted
    extends Action<'ADD_COMMENT_COMPLETED'> {
    comment: Comment;
}
export interface ActionAddCommentFailed extends Action<'ADD_COMMENT_FAILED'> {
    errors: Errors;
}

export type ArticleAction =
    | ActionLoadArticleRequested
    | ActionLoadArticleCompleted
    | ActionLoadArticleFailed
    | ActionLoadCommentsRequested
    | ActionLoadCommentsCompleted
    | ActionLoadCommentsFailed
    | ActionDeleteArticleRequested
    | ActionDeleteArticleCompleted
    | ActionDeleteArticleFailed
    | ActionDeleteCommentRequested
    | ActionDeleteCommentCompleted
    | ActionDeleteCommentFailed
    | ActionAddCommentRequested
    | ActionAddCommentCompleted
    | ActionAddCommentFailed;

type ThunkResult = ThunkAction<void, RootState, undefined, ArticleAction>;

// Actions
const loadArticleFailed: ActionCreator<ActionLoadArticleFailed> = () => {
    return { type: LOAD_ARTICLE_FAILED };
};

const loadArticleCompleted: ActionCreator<ActionLoadArticleCompleted> = (
    article: Article,
) => {
    return { type: LOAD_ARTICLE_COMPLETED, article };
};

const loadArticleRequested: ActionCreator<ActionLoadArticleRequested> = (
    articleSlug: string,
) => {
    return { type: LOAD_ARTICLE_REQUESTED, articleSlug };
};

const loadCommentsFailed: ActionCreator<ActionLoadCommentsFailed> = () => {
    return { type: LOAD_COMMENTS_FAILED };
};

const loadCommentsCompleted: ActionCreator<ActionLoadCommentsCompleted> = (
    comments: Comment[],
) => {
    return { type: LOAD_COMMENTS_COMPLETED, comments };
};

const loadCommentsRequested: ActionCreator<ActionLoadCommentsRequested> = (
    articleSlug: string,
) => {
    return { type: LOAD_COMMENTS_REQUESTED, articleSlug };
};

const deleteArticleFailed: ActionCreator<ActionDeleteArticleFailed> = () => {
    return { type: DELETE_ARTICLE_FAILED };
};

const deleteArticleCompleted: ActionCreator<ActionDeleteArticleCompleted> = (
    articleSlug: string,
) => {
    return { type: DELETE_ARTICLE_COMPLETED, articleSlug };
};

const deleteArticleRequested: ActionCreator<ActionDeleteArticleRequested> = (
    articleSlug: string,
) => {
    return { type: DELETE_ARTICLE_REQUESTED, articleSlug };
};

const deleteCommentFailed: ActionCreator<ActionDeleteCommentFailed> = () => {
    return { type: DELETE_COMMENT_FAILED };
};

const deleteCommentCompleted: ActionCreator<ActionDeleteCommentCompleted> = (
    commentId: number,
) => {
    return { type: DELETE_COMMENT_COMPLETED, commentId };
};

const deleteCommentRequested: ActionCreator<ActionDeleteCommentRequested> = (
    commentId: number,
) => {
    return { type: DELETE_COMMENT_REQUESTED, commentId };
};

const addCommentFailed: ActionCreator<ActionAddCommentFailed> = (
    errors: Errors,
) => {
    return { type: ADD_COMMENT_FAILED, errors };
};

const addCommentCompleted: ActionCreator<ActionAddCommentCompleted> = (
    comment: Comment,
) => {
    return { type: ADD_COMMENT_COMPLETED, comment };
};

const addCommentRequested: ActionCreator<ActionAddCommentRequested> = (
    articleSlug: string,
    commentBody: string,
) => {
    return { type: ADD_COMMENT_REQUESTED, articleSlug, commentBody };
};

interface FetchArticleResult {
    article: Article;
}

interface FetchCommentsResult {
    comments: Comment[];
}

interface AddCommentsResult {
    comment: Comment;
}

interface AddCommentsRequest {
    comment: {
        body: string
    };
}

// async action processors
export const fetchArticle: ActionCreator<ThunkResult> = (
    articleSlug: string,
) => dispatch => {
    dispatch(loadArticleRequested(articleSlug));
    fetch(`${API_ROOT}/articles/${articleSlug}`)
        .then(res => res.json())
        .then((data: FetchArticleResult) =>
            dispatch(loadArticleCompleted(data.article)),
        )
        .catch(() => dispatch(loadArticleFailed()));
};

export const fetchComments: ActionCreator<ThunkResult> = (
    articleSlug: string,
) => dispatch => {
    dispatch(loadCommentsRequested(articleSlug));
    fetch(`${API_ROOT}/articles/${articleSlug}/comments`)
        .then(res => res.json())
        .then((data: FetchCommentsResult) =>
            dispatch(loadCommentsCompleted(data.comments)),
        )
        .catch(() => dispatch(loadCommentsFailed()));
};

export const deleteComment: ActionCreator<ThunkResult> = (
    articleSlug: string,
    commentId: number,
    token: string,
) => async dispatch => {
    let headers: { [key: string]: string } = {};
    if (token) {
        headers = { Authorization: `Token ${token}` };
    }

    dispatch(deleteCommentRequested(commentId));

    try {
        const res = await fetch(
            `${API_ROOT}/articles/${articleSlug}/comments/${commentId}`,
            {
                method: 'delete',
                headers,
            },
        );
        if (res.status === 200) {
            dispatch(deleteCommentCompleted(commentId));
        } else {
            dispatch(deleteCommentFailed());
        }
    } catch (err) {
        dispatch(deleteCommentFailed());
    }
};

export const deleteArticle: ActionCreator<ThunkResult> = (
    articleSlug: string,
    token: string,
) => async dispatch => {
    let headers: { [key: string]: string } = {};
    if (token) {
        headers = { Authorization: `Token ${token}` };
    }

    dispatch(deleteArticleRequested(articleSlug));

    try {
        const res = await fetch(`${API_ROOT}/articles/${articleSlug}`, {
            method: 'delete',
            headers,
        });
        if (res.status === 200) {
            dispatch(deleteArticleCompleted(articleSlug));
            history.pushState(null, '', '/');
            dispatch(navigate());
        } else {
            dispatch(deleteArticleFailed());
        }
    } catch (err) {
        dispatch(deleteArticleFailed());
    }
};

export const addComment: ActionCreator<ThunkResult> = (
    articleSlug: string,
    commentBody: string,
    token: string,
) => async dispatch => {
    let headers: { [key: string]: string } = {};
    if (token) {
        headers = {
            Authorization: `Token ${token}`,
            'content-type': 'application/json',
        };
    }

    const body: AddCommentsRequest = {
        comment: {
            body: commentBody,
        },
    };

    dispatch(addCommentRequested(articleSlug, commentBody));

    try {
        const res = await fetch(
            `${API_ROOT}/articles/${articleSlug}/comments/`,
            {
                method: 'post',
                headers,
                body: JSON.stringify(body),
            },
        );
        if (res.status === 200) {
            const commentResult: AddCommentsResult = await res.json();
            dispatch(addCommentCompleted(commentResult.comment));
        } else {
            dispatch(addCommentFailed((await res.json()).errors as Errors));
        }
    } catch (err) {
        dispatch(addCommentFailed());
    }
};
