import { combineReducers } from 'redux';
import navigationReducer from '../core/navigation/navigation.reducer';
import userReducer from '../core/user/user.reducer';
import homeReducer from '../components/home/home.reducer';
import articleListReducer from '../components/article-list/article-list.reducer';
import articleReducer from '../components/article/article.reducer';
import profileReducer from '../components/profile/profile.reducer';
import editorReducer from '../components/editor/editor.reducer';

const rootReducer = combineReducers({
  navigation: navigationReducer,
  user: userReducer,
  home: homeReducer,
  article: articleReducer,
  articleList: articleListReducer,
  profile: profileReducer,
  editor: editorReducer,
});

export default rootReducer;
