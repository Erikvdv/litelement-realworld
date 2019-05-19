import { Reducer } from 'redux';
import {
    LOAD_ARTICLE_LIST_REQUESTED, LOAD_ARTICLE_LIST_COMPLETED, LOAD_ARTICLE_LIST_FAILED
} from '../actions/article-list';
import { RootAction, RootState } from '../store';
import { Article } from '../models';

export interface ArticleListState {
    articleList?: Article[];
    failure?: boolean;
    isFetching?: boolean;
};

const articleList: Reducer<ArticleListState, RootAction> = (state = {}, action) => {
    switch (action.type) {
        case LOAD_ARTICLE_LIST_REQUESTED:

            return {
                ...state,
                isFetching: true,
                failure: false
            };
        case LOAD_ARTICLE_LIST_FAILED:
            return {
                ...state,
                isFetching: false,
                failure: true
            };
        case LOAD_ARTICLE_LIST_COMPLETED:
            return {
                ...state,
                isFetching: false,
                articleList: action.articles
            };
        default:
            return state;
    }
}

export default articleList;

export const articleListSelector = (state: RootState) => state.articleList;

