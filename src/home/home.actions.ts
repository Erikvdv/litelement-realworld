import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { API_ROOT } from '../constants';
import { ArticleListQuery, ArticleListType } from '../models/article-list-query.model';
import { navigate } from '../root/root.actions';

// Action Types
export const LOAD_TAGS_REQUESTED = 'LOAD_TAGS_REQUESTED';
export const LOAD_TAGS_COMPLETED = 'LOAD_TAGS_COMPLETED';
export const LOAD_TAGS_FAILED = 'LOAD_TAGS_FAILED';
export const SET_ARTICLES_QUERY = 'SET_ARTICLES_QUERY';

// Actions Interfaces
export interface HomeActionLoadTagsRequested extends Action<'LOAD_TAGS_REQUESTED'> { }
export interface HomeActionLoadTagsCompleted extends Action<'LOAD_TAGS_COMPLETED'> { tags: string[]; }
export interface HomeActionLoadTagsFailed extends Action<'LOAD_TAGS_FAILED'> { }
export interface HomeActionSetArticlesQuery extends Action<'SET_ARTICLES_QUERY'> { query: ArticleListQuery; }

export type HomeAction =
    HomeActionLoadTagsRequested |
    HomeActionLoadTagsCompleted |
    HomeActionLoadTagsFailed |
    HomeActionSetArticlesQuery;

type ThunkResult = ThunkAction<void, RootState, undefined, HomeAction>;

// Actions
const loadTagsCompleted: ActionCreator<HomeActionLoadTagsCompleted> = (tags: string[]) => {
    return {
        type: LOAD_TAGS_COMPLETED,
        tags
    };
};

const loadTagsRequested: ActionCreator<HomeActionLoadTagsRequested> = () => {
    return {
        type: LOAD_TAGS_REQUESTED
    };
};

const loadTagsFailed: ActionCreator<HomeActionLoadTagsFailed> = () => {
    return {
        type: LOAD_TAGS_FAILED
    };
};

export const setArticlesQuery: ActionCreator<HomeActionSetArticlesQuery> = (query: ArticleListQuery) => {
    return {
        type: SET_ARTICLES_QUERY,
        query
    };
};

// async action processors
export const fetchTags: ActionCreator<ThunkResult> = () => (dispatch) => {
    dispatch(loadTagsRequested());
    fetch(`${API_ROOT}/tags`)
        .then(res => res.json())
        .then(data => dispatch(loadTagsCompleted(data.tags)))
        .catch(() => dispatch(loadTagsFailed()));
};

export const navigateArticles: ActionCreator<ThunkResult> = (query: ArticleListQuery, isLoggedIn) => (dispatch) => {

    if (query.type === ArticleListType.feed && !isLoggedIn) {
        setTimeout(() => { // needed as the click event needs to be handled by the router before changing the route
            history.pushState(null, '', '/login');
            dispatch(navigate());
        }, 0);

        return;
    }
    dispatch(setArticlesQuery(query));
};
