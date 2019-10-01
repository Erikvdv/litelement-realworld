import { createAsyncAction, createStandardAction } from 'typesafe-actions';
import { SelectedTab } from './home.models';
import { ArticleListQuery } from '../../models/article-list-query.model';

export const tags = createAsyncAction(
  'FETCH_TAGS_REQUEST',
  'FETCH_TAGS_SUCCESS',
  'FETCH_TAGS_FAILURE',
)<void, string[], void>();

export const initiateTab = createStandardAction('INITIATE_TAB')<void>();

export const selectTag = createStandardAction('SELECT_TAG')<string>();

export const selectTab = createStandardAction('SELECT_TAB')<SelectedTab>();

export const setQuery = createStandardAction('SET_QUERY')<ArticleListQuery>();
