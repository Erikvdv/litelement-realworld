import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { API_ROOT } from '../constants';

// Action Types
export const LOAD_TAGS_REQUESTED = 'LOAD_TAGS_REQUESTED';
export const LOAD_TAGS_COMPLETED = 'LOAD_TAGS_COMPLETED';
export const LOAD_TAGS_FAILED = 'LOAD_TAGS_FAILED';

// Actions Interfaces
export interface AppActionLoadTagsRequested extends Action<'LOAD_TAGS_REQUESTED'> { }
export interface AppActionLoadTagsCompleted extends Action<'LOAD_TAGS_COMPLETED'> { tags: string[]; }
export interface AppActionLoadTagsFailed extends Action<'LOAD_TAGS_FAILED'> { }

export type HomeAction =
    AppActionLoadTagsRequested |
    AppActionLoadTagsCompleted |
    AppActionLoadTagsFailed;

type ThunkResult = ThunkAction<void, RootState, undefined, HomeAction>;

// Actions
const loadTagsCompleted: ActionCreator<AppActionLoadTagsCompleted> = (tags: string[]) => {
    return {
        type: LOAD_TAGS_COMPLETED,
        tags
    };
};

const loadTagsRequested: ActionCreator<AppActionLoadTagsRequested> = () => {
    return {
        type: LOAD_TAGS_REQUESTED
    };
};

const loadTagsFailed: ActionCreator<AppActionLoadTagsFailed> = () => {
    return {
        type: LOAD_TAGS_FAILED
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
