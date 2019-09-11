import { combineReducers } from 'redux';
import navigationReducer from '../../components/root/navigation/navigation.reducer';
import userReducer from '../user/user.reducer';
import homeReducer from '../../components/home/home.reducer';
import articleListReducer from '../../components/article-list/article-list.reducer';
import articleReducer from '../../components/article/article.reducer';

const rootReducer = combineReducers({
  navigation: navigationReducer,
  user: userReducer,
  home: homeReducer,
  article: articleReducer,
  articleList: articleListReducer,
});

export default rootReducer;
