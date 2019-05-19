import { Reducer } from 'redux';
import {
    LOAD_TAGS_REQUESTED, LOAD_TAGS_COMPLETED, LOAD_TAGS_FAILED
} from '../actions/home';
import { RootAction, RootState } from '../store';

export interface HomeState {
    tags?: string[];
    failure?: boolean;
    isFetching?: boolean;
};

const home: Reducer<HomeState, RootAction> = (state = {}, action) => {
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
}


export default home;

export const homeSelector = (state: RootState) => state.home;

