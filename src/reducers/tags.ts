import { Reducer } from 'redux';
import {
    LOAD_TAGS_REQUESTED, LOAD_TAGS_COMPLETED, LOAD_TAGS_FAILED
} from '../actions/tags';
import { RootAction, RootState } from '../store';

export interface TagsState {
    tags: string[];
    failure: boolean;
    isFetching: boolean;
}

const initialState: TagsState = {
    tags: [],
    failure: false,
    isFetching: false
};

const tags: Reducer<TagsState, RootAction> = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TAGS_REQUESTED:
            return {
                ...state,
                isFetching: true,
                failure: false
            };
        case LOAD_TAGS_FAILED:
            return {
                ...state,
                isFetching: false,
                failure: true
            };
        case LOAD_TAGS_COMPLETED:
            return {
                ...state,
                isFetching: false,
                tags: action.tags
            };
        default:
            return state;
    }
};


export default tags;

export const tagsSelector = (state: RootState) => state.tags;

