import { Reducer } from 'redux';

import { Errors } from '../models';
import { RequestStatus } from '../models/request-status.model';
import { RootAction, RootState } from '../store';
import {
    ADD_ARTICLE_COMPLETED,
    ADD_ARTICLE_FAILED,
    ADD_ARTICLE_REQUESTED,
} from './editor.actions';

export interface EditorState {
    addArticleStatus: RequestStatus;
    errors?: Errors;
}

const initialState: EditorState = {
    addArticleStatus: RequestStatus.notStarted,
};

const editor: Reducer<EditorState, RootAction> = (
    state = initialState,
    action,
) => {
    switch (action.type) {
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
