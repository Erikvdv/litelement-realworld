import { Reducer } from 'redux';

import { Errors, Article } from '../models';
import { RequestStatus } from '../models/request-status.model';
import { RootAction, RootState } from '../store';
import {
  LOAD_ARTICLE_COMPLETED,
  LOAD_ARTICLE_FAILED,
  LOAD_ARTICLE_REQUESTED,
  ADD_ARTICLE_COMPLETED,
  ADD_ARTICLE_FAILED,
  ADD_ARTICLE_REQUESTED,
  EDITOR_RESET,
} from './editor.actions';

export interface EditorState {
  addArticleStatus: RequestStatus;
  articleRequestStatus: RequestStatus;
  errors?: Errors;
  article?: Article;
}

const initialState: EditorState = {
  addArticleStatus: RequestStatus.notStarted,
  articleRequestStatus: RequestStatus.notStarted,
};

const editor: Reducer<EditorState, RootAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case EDITOR_RESET:
      return {
        ...initialState,
      };
    case LOAD_ARTICLE_REQUESTED:
      return {
        ...state,
        articleRequestStatus: RequestStatus.fetching,
      };
    case LOAD_ARTICLE_FAILED:
      return {
        ...state,
        articleRequestStatus: RequestStatus.failed,
      };
    case LOAD_ARTICLE_COMPLETED:
      return {
        ...state,
        articleRequestStatus: RequestStatus.completed,
        article: action.article,
      };
    case ADD_ARTICLE_REQUESTED:
      return {
        ...state,
        addCommentRequestStatus: RequestStatus.fetching,
      };
    case ADD_ARTICLE_FAILED:
      return {
        ...state,
        addCommentRequestStatus: RequestStatus.failed,
        errors: action.errors,
      };
    case ADD_ARTICLE_COMPLETED:
      return {
        ...state,
        addCommentRequestStatus: RequestStatus.completed,
      };
    default:
      return state;
  }
};

export default editor;

export const editorStateSelector = (state: RootState) => state.editor;
