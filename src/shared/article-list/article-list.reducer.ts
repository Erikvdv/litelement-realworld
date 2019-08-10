import { Reducer } from 'redux'
import {
    LOAD_ARTICLE_LIST_REQUESTED,
    LOAD_ARTICLE_LIST_COMPLETED,
    LOAD_ARTICLE_LIST_FAILED,
    ARTICLE_LIST_SET_PAGE,
    SET_FAVORITE_REQUESTED,
    SET_FAVORITE_COMPLETED,
    SET_FAVORITE_FAILED,
    DELETE_FAVORITE_FAILED,
    DELETE_FAVORITE_COMPLETED,
    DELETE_FAVORITE_REQUESTED,
} from './article-list.actions'
import { RootAction, RootState } from '../../store'
import { Article } from '../../models'
import { createSelector } from 'reselect'
import { RequestStatus } from '../../models/request-status.model'

export interface ArticleListState {
    articleList: Article[]
    articleCount: number
    failure: boolean
    isFetching: boolean
    activePage: number
    pageSize: number
    favoriteStatus: RequestStatus
}

const initialState: ArticleListState = {
    articleList: [],
    articleCount: 0,
    failure: false,
    isFetching: false,
    activePage: 1,
    pageSize: 10,
    favoriteStatus: RequestStatus.notStarted,
}

const articleList: Reducer<ArticleListState, RootAction> = (
    state = initialState,
    action,
) => {
    switch (action.type) {
        case LOAD_ARTICLE_LIST_REQUESTED:
            return {
                ...state,
                isFetching: true,
                failure: false,
                activePage: action.config.filters.offset
                    ? action.config.filters.offset /
                          action.config.filters.limit +
                      1
                    : 1,
            }
        case LOAD_ARTICLE_LIST_FAILED:
            return {
                ...state,
                isFetching: false,
                failure: true,
            }
        case LOAD_ARTICLE_LIST_COMPLETED:
            return {
                ...state,
                isFetching: false,
                articleList: action.articles,
                articleCount: action.articleCount,
            }
        case ARTICLE_LIST_SET_PAGE:
            return {
                ...state,
                activePage: action.page,
            }
        case SET_FAVORITE_REQUESTED:
            return {
                ...state,
                favoriteStatus: RequestStatus.fetching,
            }
        case SET_FAVORITE_COMPLETED:
            return {
                ...state,
                favoriteStatus: RequestStatus.completed,
                articleList: state.articleList.map(item =>
                    item.slug === action.slug ? { ...action.article } : item,
                ),
            }

        case SET_FAVORITE_FAILED:
            return {
                ...state,
                favoriteStatus: RequestStatus.failed,
            }
        case DELETE_FAVORITE_REQUESTED:
            return {
                ...state,
                favoriteStatus: RequestStatus.fetching,
            }
        case DELETE_FAVORITE_COMPLETED:
            return {
                ...state,
                favoriteStatus: RequestStatus.completed,
                articleList: state.articleList.map(item =>
                    item.slug === action.slug ? { ...action.article } : item,
                ),
            }

        case DELETE_FAVORITE_FAILED:
            return {
                ...state,
                favoriteStatus: RequestStatus.failed,
            }
        default:
            return state
    }
}

export default articleList

export const articleListStateSelector = (state: RootState) => state.articleList

export const pageCountSelector = createSelector(
    articleListStateSelector,
    item => {
        if (item) {
            return Math.ceil(item.articleCount / item.pageSize)
        }
        return 0
    },
)
