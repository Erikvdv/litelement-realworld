import * as homeActions from './home.actions';
import { ActionType, getType } from 'typesafe-actions';
import { RequestStatus } from '../../models/request-status.model';
import { SelectedTab } from './home.models';
import { ArticleListQuery } from '../../models';

type HomeAction = ActionType<typeof homeActions>;

export interface HomeState {
  selectedTag: string;
  selectedTab: SelectedTab;
  articleListQuery?: ArticleListQuery;
  fetchTagsStatus: RequestStatus;
  tags: string[];
}

const initialState: HomeState = {
  selectedTag: '',
  selectedTab: SelectedTab.all,
  fetchTagsStatus: RequestStatus.notStarted,
  tags: [],
};

const tags = (state: HomeState = initialState, action: HomeAction) => {
  switch (action.type) {
    case getType(homeActions.tags.request):
      return {
        ...state,
        fetchTagsStatus: RequestStatus.fetching,
      };
    case getType(homeActions.tags.failure):
      return {
        ...state,
        fetchTagsStatus: RequestStatus.failed,
      };
    case getType(homeActions.tags.success):
      return {
        ...state,
        fetchTagsStatus: RequestStatus.completed,
        tags: action.payload,
      };
    case getType(homeActions.selectTag):
      return {
        ...state,
        selectedTab: SelectedTab.tag,
        selectedTag: action.payload,
      };
    case getType(homeActions.selectTab):
      return {
        ...state,
        selectedTag: '',
        selectedTab: action.payload,
      };

    case getType(homeActions.setQuery):
      return {
        ...state,
        articleListQuery: action.payload,
      };
    default:
      return state;
  }
};

export default tags;
