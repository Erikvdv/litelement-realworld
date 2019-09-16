import * as navigationActions from '../core/navigation/navigation.actions';
import * as userActions from '../core/user/user.actions';
import * as homeActions from '../components/home/home.actions';
import * as articleListActions from '../components/shared/article-list/article-list.actions';
import * as articleActions from '../components/article/article.actions';
import * as profileActions from '../components/profile/profile.actions';
import * as editorActions from '../components/editor/editor.actions';

export default {
  navigation: navigationActions,
  auth: userActions,
  home: homeActions,
  articleList: articleListActions,
  article: articleActions,
  profile: profileActions,
  editor: editorActions,
};
