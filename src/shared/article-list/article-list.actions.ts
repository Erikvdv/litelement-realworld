import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store';
import { Article, ArticleListQuery, ArticleListType } from '../../models';
import { API_ROOT } from '../../constants';
import { navigate } from '../../root/root.actions';

// Action Types
export const LOAD_ARTICLE_LIST_REQUESTED = 'LOAD_ARTICLE_LIST_REQUESTED';
export const LOAD_ARTICLE_LIST_COMPLETED = 'LOAD_ARTICLE_LIST_COMPLETED';
export const LOAD_ARTICLE_LIST_FAILED = 'LOAD_ARTICLE_LIST_FAILED';
export const ARTICLE_LIST_SET_PAGE = 'ARTICLE_LIST_SET_PAGE';
export const SET_FAVORITE_REQUESTED = 'SET_FAVORITE_REQUESTED';
export const SET_FAVORITE_COMPLETED = 'SET_FAVORITE_COMPLETED';
export const SET_FAVORITE_FAILED = 'SET_FAVORITE_FAILED';
export const DELETE_FAVORITE_REQUESTED = 'DELETE_FAVORITE_REQUESTED';
export const DELETE_FAVORITE_COMPLETED = 'DELETE_FAVORITE_COMPLETED';
export const DELETE_FAVORITE_FAILED = 'DELETE_FAVORITE_FAILED';

// Actions Interfaces
export interface AppActionLoadArticleListRequested extends Action<'LOAD_ARTICLE_LIST_REQUESTED'> { config: ArticleListQuery; }
export interface AppActionLoadArticleListCompleted extends Action<'LOAD_ARTICLE_LIST_COMPLETED'> {
    articles: Article[]; articleCount: number; }

export interface AppActionLoadArticleListFailed extends Action<'LOAD_ARTICLE_LIST_FAILED'> {}

export interface AppActionArticleListSetPage extends Action<'ARTICLE_LIST_SET_PAGE'> { page: number; }

export interface ArticleListActionSetFavoriteRequested extends Action<'SET_FAVORITE_REQUESTED'> { slug: string; }
export interface ArticleListActionSetFavoriteFailed extends Action<'SET_FAVORITE_FAILED'> { slug: string; }
export interface ArticleListActionSetFavoriteCompleted extends Action<'SET_FAVORITE_COMPLETED'> { slug: string; article: Article; }
export interface ArticleListActionDeleteFavoriteRequested extends Action<'DELETE_FAVORITE_REQUESTED'> { slug: string; }
export interface ArticleListActionDeleteFavoriteFailed extends Action<'DELETE_FAVORITE_FAILED'> { slug: string; }
export interface ArticleListActionDeleteFavoriteCompleted extends Action<'DELETE_FAVORITE_COMPLETED'> { slug: string; article: Article; }

export type ArticleListAction =
    AppActionLoadArticleListRequested |
    AppActionLoadArticleListCompleted |
    AppActionLoadArticleListFailed |
    AppActionArticleListSetPage |
    ArticleListActionSetFavoriteRequested |
    ArticleListActionSetFavoriteFailed |
    ArticleListActionSetFavoriteCompleted |
    ArticleListActionDeleteFavoriteRequested |
    ArticleListActionDeleteFavoriteFailed |
    ArticleListActionDeleteFavoriteCompleted
    ;

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

const setFavoriteRequested: ActionCreator<ArticleListActionSetFavoriteRequested> = (slug: string) => {
    return { type: SET_FAVORITE_REQUESTED, slug: slug };
};

const setFavoriteFailed: ActionCreator<ArticleListActionSetFavoriteFailed> = (slug: string) => {
    return { type: SET_FAVORITE_FAILED, slug: slug };
};

const setFavoriteCompleted: ActionCreator<ArticleListActionSetFavoriteCompleted> = (slug: string, article: Article) => {
    return { type: SET_FAVORITE_COMPLETED, slug: slug, article: article };
};

const deleteFavoriteRequested: ActionCreator<ArticleListActionDeleteFavoriteRequested> = (slug: string) => {
    return { type: DELETE_FAVORITE_REQUESTED, slug: slug };
};

const deleteFavoriteFailed: ActionCreator<ArticleListActionDeleteFavoriteFailed> = (slug: string) => {
    return { type: DELETE_FAVORITE_FAILED, slug: slug };
};

const deleteFavoriteCompleted: ActionCreator<ArticleListActionDeleteFavoriteCompleted> = (slug: string, article: Article) => {
    return { type: DELETE_FAVORITE_COMPLETED, slug: slug, article: article };
};


interface FetchArticleListResult {
    articles: Article[];
    articlesCount: number;

}

interface SetFavoriteArticleResult {
    article: Article;
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

export const setFavorite: ActionCreator<ThunkResult> = (slug: string, token: string) => (dispatch) => {
    if (!token) {
        setTimeout(() => { // needed as the click event needs to be handled by the router before changing the route
            history.pushState(null, '', '/login');
            dispatch(navigate());
        }, 0);
        return;
    }

    let headers: { [key: string]: string } = {};
    if (token) { headers = {'Authorization': `Token ${token}`}; }

    dispatch(setFavoriteRequested(slug));
    fetch(`${API_ROOT}/articles/${slug}/favorite`, {method: 'POST', headers: headers})
        .then(res => res.json())
        .then((data: SetFavoriteArticleResult) => dispatch(setFavoriteCompleted(slug, data.article)))
        .catch(() => dispatch(setFavoriteFailed(slug)));
};

export const deleteFavorite: ActionCreator<ThunkResult> = (slug: string, token: string) => (dispatch) => {

    let headers: { [key: string]: string } = {};
    if (token) { headers = {'Authorization': `Token ${token}`}; }

    dispatch(deleteFavoriteRequested(slug));
    fetch(`${API_ROOT}/articles/${slug}/favorite`, {method: 'DELETE', headers: headers})
        .then(res => res.json())
        .then((data: SetFavoriteArticleResult) => dispatch(deleteFavoriteCompleted(slug, data.article)))
        .catch(() => dispatch(deleteFavoriteFailed(slug)));
};
