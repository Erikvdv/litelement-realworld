import { Reducer } from 'redux';
import {
    LOAD_ARTICLE_LIST_REQUESTED, LOAD_ARTICLE_LIST_COMPLETED, LOAD_ARTICLE_LIST_FAILED, ARTICLE_LIST_SET_PAGE
} from '../actions/article-list';
import { RootAction, RootState } from '../store';
import { Article } from '../models';
import { createSelector } from 'reselect';

export interface ArticleListState {
    articleList: Article[];
    articleCount: number;
    failure: boolean;
    isFetching: boolean;
    activePage: number;
    pageSize: number;
}

const initialState: ArticleListState = {
    articleList: [],
    articleCount: 0,
    failure: false,
    isFetching: false,
    activePage: 1,
    pageSize: 10
};

const articleList: Reducer<ArticleListState, RootAction> = (state = initialState, action) => {
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
                articleList: action.articles,
                articleCount: action.articleCount
            };
        case ARTICLE_LIST_SET_PAGE:
            return {
                ...state,
                activePage: action.page
            };
        default:
            return state;
    }
};

export default articleList;

export const articleListStateSelector = (state: RootState) => state.articleList;

export const pageCountSelector = createSelector(
    articleListStateSelector,
    (item) => {
        if (item) {
            return Math.ceil(item.articleCount / item.pageSize);
        }
        return 0;
    }
  );

