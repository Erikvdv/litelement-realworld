import { createAsyncAction, createStandardAction } from 'typesafe-actions';
import { Profile, ProfileTab } from '../../models/profile.model';

export const setProfileUsername = createStandardAction('SET_PROFILE_USERNAME')<
  string
>();

export const setProfileTab = createStandardAction('SET_PROFILE_TAB')<
  ProfileTab
>();

export const fetchProfile = createAsyncAction(
  'FETCH_PROFILE_REQUEST',
  'FETCH_PROFILE_SUCCESS',
  'FETCH_PROFILE_FAILURE',
)<string, Profile, void>();

export const followProfile = createAsyncAction(
  'FOLLOW_PROFILE_REQUEST',
  'FOLLOW_PROFILE_SUCCESS',
  'FOLLOW_PROFILE_FAILURE',
)<string, Profile, void>();

export const unfollowProfile = createAsyncAction(
  'UNFOLLOW_PROFILE_REQUEST',
  'UNFOLLOW_PROFILE_SUCCESS',
  'UNFOLLOW_PROFILE_FAILURE',
)<string, Profile, void>();
