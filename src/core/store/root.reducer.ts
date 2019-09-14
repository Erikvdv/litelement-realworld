import { combineReducers } from 'redux';
import navigationReducer from '../../components/root/navigation/navigation.reducer';
import userReducer from '../user/user.reducer';
import homeReducer from '../../components/home/home.reducer';
import articleListReducer from '../../components/article-list/article-list.reducer';
import articleReducer from '../../components/article/article.reducer';
import profileReducer from '../../components/profile/profile.reducer';

const rootReducer = combineReducers({
  navigation: navigationReducer,
  user: userReducer,
  home: homeReducer,
  article: articleReducer,
  articleList: articleListReducer,
  profile: profileReducer,
});

export default rootReducer;
