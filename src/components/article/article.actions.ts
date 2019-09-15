import { createAsyncAction, createStandardAction } from 'typesafe-actions';
import { Article, NewArticle, Errors } from '../../models';

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

export const addArticle = createAsyncAction(
  'ADD_ARTICLE_REQUEST',
  'ADD_ARTICLE_SUCCESS',
  'ADD_ARTICLE_FAILURE',
)<NewArticle, Article, Errors>();

export const updateArticle = createAsyncAction(
  'UPDATE_ARTICLE_REQUEST',
  'UPDATE_ARTICLE_SUCCESS',
  'UPDATE_ARTICLE_FAILURE',
)<Article, Article, Errors>();

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

export const resetArticle = createStandardAction('RESET_ARTICLE')<void>();
