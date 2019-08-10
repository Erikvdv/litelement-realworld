import { Reducer } from 'redux';
import { Article, Errors } from '../models';
import { Comment } from '../models/comment.model';
import { RequestStatus } from '../models/request-status.model';
import { RootAction, RootState } from '../store';
import {
    ADD_COMMENT_COMPLETED,
    ADD_COMMENT_FAILED,
    ADD_COMMENT_REQUESTED,
    DELETE_COMMENT_COMPLETED,
    LOAD_ARTICLE_COMPLETED,
    LOAD_ARTICLE_FAILED,
    LOAD_ARTICLE_REQUESTED,
    LOAD_COMMENTS_COMPLETED,
    LOAD_COMMENTS_FAILED,
    LOAD_COMMENTS_REQUESTED,
} from './article.actions';

export interface ArticleState {
    article?: Article;
    articleRequestStatus: RequestStatus;
    comments: Comment[];
    commentsRequestStatus: RequestStatus;
    addCommentRequestStatus: RequestStatus;
    errors?: Errors;
}

const initialState: ArticleState = {
    articleRequestStatus: RequestStatus.notStarted,
    commentsRequestStatus: RequestStatus.notStarted,
    addCommentRequestStatus: RequestStatus.notStarted,
    comments: [],
};

const article: Reducer<ArticleState, RootAction> = (
    state = initialState,
    action,
) => {
    switch (action.type) {
        case LOAD_ARTICLE_REQUESTED:
            return {
                ...state,
                articleRequestStatus: RequestStatus.fetching,
            };
        case LOAD_ARTICLE_FAILED:
            return {
                ...state,
                articleRequestStatus: RequestStatus.failed,
            };
        case LOAD_ARTICLE_COMPLETED:
            return {
                ...state,
                articleRequestStatus: RequestStatus.completed,
                article: action.article,
            };
        case LOAD_COMMENTS_REQUESTED:
            return {
                ...state,
                commentsRequestStatus: RequestStatus.fetching,
            };
        case LOAD_COMMENTS_FAILED:
            return {
                ...state,
                commentsRequestStatus: RequestStatus.failed,
            };
        case LOAD_COMMENTS_COMPLETED:
            return {
                ...state,
                commentsRequestStatus: RequestStatus.completed,
                comments: action.comments,
            };
        case DELETE_COMMENT_COMPLETED:
            return {
                ...state,
                comments: state.comments.filter(comment => {
                    if (comment.id === action.commentId) {
                        return;
                    } else {
                        return comment;
                    }
                }),
            };
        case ADD_COMMENT_REQUESTED:
            return {
                ...state,
                addCommentRequestStatus: RequestStatus.fetching,
            };
        case ADD_COMMENT_FAILED:
            return {
                ...state,
                addCommentRequestStatus: RequestStatus.failed,
                errors: action.errors,
            };
        case ADD_COMMENT_COMPLETED:
            return {
                ...state,
                addCommentRequestStatus: RequestStatus.completed,
                comments: [action.comment, ...state.comments],
            };
        default:
            return state;
    }
};

export default article;

export const articleStateSelector = (state: RootState) => state.article;
