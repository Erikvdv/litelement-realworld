import * as editorActions from './editor.actions';
import { ActionType, getType } from 'typesafe-actions';

type ProfileAction = ActionType<typeof editorActions>;

export interface ProfileState {
  articleSlug: string;
}

const initialState: ProfileState = {
  articleSlug: '',
};

export default (state: ProfileState = initialState, action: ProfileAction) => {
  switch (action.type) {
    case getType(editorActions.resetEditor):
      return {
        ...state,
        articleSlug: action.payload,
      };
    default:
      return state;
  }
};
