import { Reducer } from 'redux';
import {
    LOAD_ARTICLE_REQUESTED, LOAD_ARTICLE_COMPLETED, LOAD_ARTICLE_FAILED
} from './article.actions';
import { RootAction, RootState } from '../store';
import { Article } from '../models';

export interface ArticleState {
    article?: Article;
    failure?: boolean;
    isFetching?: boolean;
}

const article: Reducer<ArticleState, RootAction> = (state = {}, action) => {
    switch (action.type) {
        case LOAD_ARTICLE_REQUESTED:

            return {
                ...state,
                isFetching: true,
                failure: false
            };
        case LOAD_ARTICLE_FAILED:
            return {
                ...state,
                isFetching: false,
                failure: true
            };
        case LOAD_ARTICLE_COMPLETED:
            return {
                ...state,
                isFetching: false,
                article: action.article
            };
        default:
            return state;
    }
};

export default article;

export const articleStateSelector = (state: RootState) => state.article;

