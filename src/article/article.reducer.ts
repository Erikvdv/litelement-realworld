import { Reducer } from 'redux';
import {
    LOAD_ARTICLE_REQUESTED, LOAD_ARTICLE_COMPLETED, LOAD_ARTICLE_FAILED,
    LOAD_COMMENTS_REQUESTED, LOAD_COMMENTS_FAILED, LOAD_COMMENTS_COMPLETED
} from './article.actions';
import { RootAction, RootState } from '../store';
import { Article } from '../models';
import { RequestStatus } from '../models/request-status.model';

export interface ArticleState {
    article?: Article;
    articleRequestStatus: RequestStatus;
    comments?: Comment[];
    commentsRequestStatus: RequestStatus;
}

const initialState: ArticleState = {
    articleRequestStatus: RequestStatus.notStarted,
    commentsRequestStatus:  RequestStatus.notStarted
};

const article: Reducer<ArticleState, RootAction> = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ARTICLE_REQUESTED:
            return {
                ...state,
                articleRequestStatus: RequestStatus.fetching
            };
        case LOAD_ARTICLE_FAILED:
            return {
                ...state,
                articleRequestStatus: RequestStatus.failed
            };
        case LOAD_ARTICLE_COMPLETED:
            return {
                ...state,
                articleRequestStatus: RequestStatus.completed,
                article: action.article
            };
        case LOAD_COMMENTS_REQUESTED:
            return {
                ...state,
                commentsRequestStatus: RequestStatus.fetching
            };
        case LOAD_COMMENTS_FAILED:
            return {
                ...state,
                commentsRequestStatus: RequestStatus.failed
            };
        case LOAD_COMMENTS_COMPLETED:
            return {
                ...state,
                commentsRequestStatus: RequestStatus.completed,
                comments: action.comments
            };
        default:
            return state;
    }
};

export default article;

export const articleStateSelector = (state: RootState) => state.article;

