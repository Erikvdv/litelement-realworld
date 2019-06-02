import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store';
import { Article, ArticleListQuery, ArticleListType } from '../../models';
import { API_ROOT } from '../../constants';

// Action Types
export const LOAD_ARTICLE_LIST_REQUESTED = 'LOAD_ARTICLE_LIST_REQUESTED';
export const LOAD_ARTICLE_LIST_COMPLETED = 'LOAD_ARTICLE_LIST_COMPLETED';
export const LOAD_ARTICLE_LIST_FAILED = 'LOAD_ARTICLE_LIST_FAILED';
export const ARTICLE_LIST_SET_PAGE = 'ARTICLE_LIST_SET_PAGE';

// Actions Interfaces
export interface AppActionLoadArticleListRequested extends Action<'LOAD_ARTICLE_LIST_REQUESTED'> { config: ArticleListQuery; }
export interface AppActionLoadArticleListCompleted extends Action<'LOAD_ARTICLE_LIST_COMPLETED'> {
    articles: Article[]; articleCount: number; }

export interface AppActionLoadArticleListFailed extends Action<'LOAD_ARTICLE_LIST_FAILED'> {}

export interface AppActionArticleListSetPage extends Action<'ARTICLE_LIST_SET_PAGE'> { page: number; }

export type ArticleListAction =
    AppActionLoadArticleListRequested |
    AppActionLoadArticleListCompleted |
    AppActionLoadArticleListFailed |
    AppActionArticleListSetPage;

type ThunkResult = ThunkAction<void, RootState, undefined, ArticleListAction>;


// Actions
const loadArticleListFailed: ActionCreator<AppActionLoadArticleListFailed> = () => {
    return {
        type: LOAD_ARTICLE_LIST_FAILED
    };
};

const loadArticleListCompleted: ActionCreator<AppActionLoadArticleListCompleted> = (articles: Article[], articleCount: number) => {
    return {
      type: LOAD_ARTICLE_LIST_COMPLETED,
      articles,
      articleCount
    };
  };

const loadArticleListRequested: ActionCreator<AppActionLoadArticleListRequested> = (config: ArticleListQuery) => {
    return {
        type: LOAD_ARTICLE_LIST_REQUESTED,
        config
    };
};

const articleListSetPageAction: ActionCreator<AppActionArticleListSetPage> = (page: number) => {
    return {
        type: ARTICLE_LIST_SET_PAGE,
        page
    };
};


interface FetchArticleListResult {
    articles: Article[];
    articlesCount: number;

}

function getAppSlug(query: ArticleListQuery) {
    let slug = '';
    query.type === ArticleListType.feed ? slug = 'feed/?' : slug = '?';
    Object.keys(query.filters).map(key => {
            slug = slug + `${key}=${query.filters[key]}&`;
    });
    return slug.slice(0, -1);
}

// async action processors
export const fetchArticleList: ActionCreator<ThunkResult> = (query: ArticleListQuery, token: string) => (dispatch) => {
    console.log('token: ' + token);
    let headers: { [key: string]: string } = {};
    if (token) { headers = {'Authorization': `Token ${token}`}; }

    const slug = getAppSlug(query);
    dispatch(loadArticleListRequested(query));
    fetch(`${API_ROOT}/articles/${slug}`, {headers: headers})
        .then(res => res.json())
        .then((data: FetchArticleListResult) => dispatch(loadArticleListCompleted(data.articles, data.articlesCount)))
        .catch(() => dispatch(loadArticleListFailed()));
};

export const articleListSetPage: ActionCreator<ThunkResult> = (page: number, query: ArticleListQuery) => (dispatch) => {
    dispatch(articleListSetPageAction(page, query));
    const newQuery = { ...query};
    newQuery.filters.offset = (page - 1) * newQuery.filters.limit;
    dispatch(fetchArticleList(newQuery));
};
