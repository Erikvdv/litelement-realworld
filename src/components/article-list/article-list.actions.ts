import { createAsyncAction, createStandardAction } from 'typesafe-actions';
import {
  ArticleListQuery,
  ArticleListResponse,
} from '../../models/article-list-query.model';
import { Article } from '../../models/article.model';

export const articleListFetch = createAsyncAction(
  'ARTICLE_LIST_FETCH_REQUEST',
  'ARTICLE_LIST_FETCH_SUCCESS',
  'ARTICLE_LIST_FETCH_FAILURE',
)<ArticleListQuery, ArticleListResponse, void>();

export const articleListSetPage = createStandardAction('ARTICLE_LIST_SET_PAGE')<
  number
>();

export const articleListSetQuery = createStandardAction(
  'ARTICLE_LIST_SET_QUERY',
)<ArticleListQuery>();

export const articleSetFavorite = createAsyncAction(
  'ARTICLE_LIST_SET_FAVORITE_REQUEST',
  'ARTICLE_LIST_SET_FAVORITE_SUCCESS',
  'ARTICLE_LIST_SET_FAVORITE_FAILURE',
)<string, Article, void>();

export const articleUnsetFavorite = createAsyncAction(
  'ARTICLE_LIST_UNSET_FAVORITE_REQUEST',
  'ARTICLE_LIST_UNSET_FAVORITE_SUCCESS',
  'ARTICLE_LIST_UNSET_FAVORITE_FAILURE',
)<string, Article, void>();
