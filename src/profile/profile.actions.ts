import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { API_ROOT } from '../constants';
import { Profile, Errors } from '../models';
import { RootState } from '../store';
import { navigate } from '../root/root.actions';
import { User } from '../models/user.model';

// Action Types
export const LOAD_PROFILE_REQUESTED = 'LOAD_PROFILE_REQUESTED';
export const LOAD_PROFILE_COMPLETED = 'LOAD_PROFILE_COMPLETED';
export const LOAD_PROFILE_FAILED = 'LOAD_PROFILE_FAILED';
export const UPDATE_USER_REQUESTED = 'UPDATE_USER_REQUESTED';
export const UPDATE_USER_COMPLETED = 'UPDATE_USER_COMPLETED';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

// Actions Interfaces
export interface ActionLoadProfileRequested
    extends Action<'LOAD_PROFILE_REQUESTED'> {
    username: string;
}
export interface ActionLoadProfileCompleted
    extends Action<'LOAD_PROFILE_COMPLETED'> {
    profile: Profile;
}
export interface ActionLoadProfileFailed
    extends Action<'LOAD_PROFILE_FAILED'> {}

export interface ActionUpdateUserRequested
    extends Action<'UPDATE_USER_REQUESTED'> {
    user: User;
}

export interface ActionUpdateUserCompleted
    extends Action<'UPDATE_USER_COMPLETED'> {}

export interface ActionUpdateUserFailed extends Action<'UPDATE_USER_FAILED'> {
    errors: Errors;
}

export type ProfileAction =
    | ActionLoadProfileRequested
    | ActionLoadProfileCompleted
    | ActionLoadProfileFailed
    | ActionUpdateUserRequested
    | ActionUpdateUserCompleted
    | ActionUpdateUserFailed;

type ThunkResult = ThunkAction<void, RootState, undefined, ProfileAction>;

// Actions
const loadProfileFailed: ActionCreator<ActionLoadProfileFailed> = () => {
    return { type: LOAD_PROFILE_FAILED };
};

const loadProfileCompleted: ActionCreator<ActionLoadProfileCompleted> = (
    profile: Profile,
) => {
    return { type: LOAD_PROFILE_COMPLETED, profile };
};

const loadProfileRequested: ActionCreator<ActionLoadProfileRequested> = (
    username: string,
) => {
    return { type: LOAD_PROFILE_REQUESTED, username };
};

const updateUserFailed: ActionCreator<ActionUpdateUserFailed> = (
    errors: Errors,
) => {
    return { type: UPDATE_USER_FAILED, errors };
};

const updateUserCompleted: ActionCreator<ActionUpdateUserCompleted> = () => {
    return { type: UPDATE_USER_COMPLETED };
};

const updateUserRequested: ActionCreator<ActionUpdateUserRequested> = (
    user: User,
) => {
    return { type: UPDATE_USER_REQUESTED, user };
};

interface FetchProfileResult {
    profile: Profile;
}

interface UpdateUserRequest {
    user: User;
}

// async action processors
export const fetchProfile: ActionCreator<ThunkResult> = (
    username: string,
) => dispatch => {
    dispatch(loadProfileRequested(username));
    fetch(`${API_ROOT}/profiles/${username}`)
        .then(res => res.json())
        .then((data: FetchProfileResult) =>
            dispatch(loadProfileCompleted(data.profile)),
        )
        .catch(() => dispatch(loadProfileFailed()));
};

export const updateUser: ActionCreator<ThunkResult> = (
    user: User,
    token: string,
) => async dispatch => {
    let headers: { [key: string]: string } = {};

    headers = {
        Authorization: `Token ${token}`,
        'content-type': 'application/json',
    };

    const body: UpdateUserRequest = {
        user,
    };

    dispatch(updateUserRequested(user));

    try {
        const res = await fetch(`${API_ROOT}/user`, {
            method: 'put',
            headers,
            body: JSON.stringify(body),
        });
        if (res.status === 200) {
            dispatch(updateUserCompleted());
            history.pushState(null, '', `/profile/${user.username}`);
            dispatch(navigate());
        } else {
            dispatch(updateUserFailed((await res.json()).errors as Errors));
        }
    } catch (err) {
        dispatch(updateUserFailed());
    }
};
