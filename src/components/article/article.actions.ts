import { createAsyncAction } from 'typesafe-actions';
import { Article } from '../../models';

export const fetchArticle = createAsyncAction(
  'FETCH_ARTICLE_REQUEST',
  'FETCH_ARTICLE_SUCCESS',
  'FETCH_ARTICLE_FAILURE',
)<string, Article, void>();

export const deleteArticle = createAsyncAction(
  'DELETE_ARTICLE_REQUEST',
  'DELETE_ARTICLE_SUCCESS',
  'DELETE_ARTICLE_FAILURE',
)<string, string, void>();

export const favoriteArticle = createAsyncAction(
  'DELETE_ARTICLE_REQUEST',
  'DELETE_ARTICLE_SUCCESS',
  'DELETE_ARTICLE_FAILURE',
)<string, string, void>();

export const fetchComments = createAsyncAction(
  'FETCH_COMMENTS_REQUEST',
  'FETCH_COMMENTS_SUCCESS',
  'FETCH_COMMENTS_FAILURE',
)<string, Comment[], void>();

export const deleteComment = createAsyncAction(
  'DELETE_COMMENT_REQUEST',
  'DELETE_COMMENT_SUCCESS',
  'DELETE_COMMENT_FAILURE',
)<number, number, void>();

export const addComment = createAsyncAction(
  'ADD_COMMENT_REQUEST',
  'ADD_COMMENT_SUCCESS',
  'ADD_COMMENT_FAILURE',
)<string, Comment, void>();
