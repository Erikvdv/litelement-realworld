import { Reducer } from 'redux';

import { Errors, Profile } from '../models';
import { RequestStatus } from '../models/request-status.model';
import { RootAction, RootState } from '../store';
import {
    LOAD_PROFILE_REQUESTED,
    LOAD_PROFILE_COMPLETED,
    LOAD_PROFILE_FAILED,
} from './profile.actions';

export interface ProfileState {
    updateUserStatus: RequestStatus;
    fetchProfileStatus: RequestStatus;
    errors?: Errors;
    profile?: Profile;
}

const initialState: ProfileState = {
    updateUserStatus: RequestStatus.notStarted,
    fetchProfileStatus: RequestStatus.notStarted,
};

const profile: Reducer<ProfileState, RootAction> = (
    state = initialState,
    action,
) => {
    switch (action.type) {
        case LOAD_PROFILE_REQUESTED:
            return {
                ...state,
                fetchProfileStatus: RequestStatus.fetching,
            };
        case LOAD_PROFILE_FAILED:
            return {
                ...state,
                fetchProfileStatus: RequestStatus.failed,
            };
        case LOAD_PROFILE_COMPLETED:
            return {
                ...state,
                fetchProfileStatus: RequestStatus.completed,
                profile: action.profile,
            };
        default:
            return state;
    }
};

export default profile;

export const profileStateSelector = (state: RootState) => state.profile;
