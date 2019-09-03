import * as navigationActions from '../../components/root/navigation/navigation.actions';
import * as authActions from '../user/user.actions';
import * as homeActions from '../../components/home/home.actions';
import * as articleListActions from '../../components/article-list/article-list.actions';

export default {
  navigation: navigationActions,
  auth: authActions,
  home: homeActions,
  articleList: articleListActions,
};
