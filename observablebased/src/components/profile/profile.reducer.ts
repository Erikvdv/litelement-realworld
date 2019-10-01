import * as profileActions from './profile.actions';
import { ActionType, getType } from 'typesafe-actions';
import { RequestStatus } from '../../models/request-status.model';
import { Errors } from '../../models/errors.model';
import { Profile, ProfileTab } from '../../models/profile.model';
import {
  ArticleListQuery,
  ArticleListType,
} from '../../models/article-list-query.model';

type ProfileAction = ActionType<typeof profileActions>;

export interface ProfileState {
  updateUserStatus: RequestStatus;
  fetchProfileStatus: RequestStatus;
  followProfileStatus: RequestStatus;
  unfollowProfileStatus: RequestStatus;
  selectedTab: ProfileTab;
  selectedUser?: string;
  articleListQuery?: ArticleListQuery;
  errors?: Errors;
  profile?: Profile;
}

const initialState: ProfileState = {
  updateUserStatus: RequestStatus.notStarted,
  fetchProfileStatus: RequestStatus.notStarted,
  followProfileStatus: RequestStatus.notStarted,
  unfollowProfileStatus: RequestStatus.notStarted,
  selectedTab: ProfileTab.my,
};

export default (state: ProfileState = initialState, action: ProfileAction) => {
  switch (action.type) {
    case getType(profileActions.setProfileUsername):
      return {
        ...state,
        selectedTab: ProfileTab.my,
        selectedUser: action.payload,
        articleListQuery: {
          type: ArticleListType.all,
          filters: { author: action.payload, limit: 10 },
        },
      };
    case getType(profileActions.setProfileTab):
      return {
        ...state,
        selectedTab: action.payload,
        articleListQuery: {
          type: ArticleListType.all,
          filters:
            action.payload === ProfileTab.my
              ? { author: state.selectedUser, limit: 10 }
              : { favorited: state.selectedUser, limit: 10 },
        },
      };
    case getType(profileActions.fetchProfile.request):
      return {
        ...state,
        profile: undefined,
        fetchProfileStatus: RequestStatus.fetching,
      };
    case getType(profileActions.fetchProfile.failure):
      return {
        ...state,
        fetchProfileStatus: RequestStatus.failed,
      };
    case getType(profileActions.fetchProfile.success):
      return {
        ...state,
        fetchProfileStatus: RequestStatus.completed,
        profile: action.payload,
      };
    case getType(profileActions.followProfile.request):
      return {
        ...state,
        followProfileStatus: RequestStatus.fetching,
      };
    case getType(profileActions.followProfile.failure):
      return {
        ...state,
        followProfileStatus: RequestStatus.failed,
      };
    case getType(profileActions.followProfile.success):
      return {
        ...state,
        followProfileStatus: RequestStatus.completed,
        profile: action.payload,
      };
    case getType(profileActions.unfollowProfile.request):
      return {
        ...state,
        unfollowProfileStatus: RequestStatus.fetching,
      };
    case getType(profileActions.unfollowProfile.failure):
      return {
        ...state,
        unfollowProfileStatus: RequestStatus.failed,
      };
    case getType(profileActions.unfollowProfile.success):
      return {
        ...state,
        unfollowProfileStatus: RequestStatus.completed,
        profile: action.payload,
      };
    default:
      return state;
  }
};
