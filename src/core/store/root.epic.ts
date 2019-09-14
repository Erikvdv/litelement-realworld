import { combineEpics } from 'redux-observable';

import * as authEpics from '../user/user.epic';
import * as tagsEpics from '../../components/home/home.epics';
import * as articleListEpics from '../../components/article-list/article-list.epics';
import * as articleEpics from '../../components/article/article.epics';
import * as profileEpics from '../../components/profile/profile.epics';

export default combineEpics(
  ...Object.values(authEpics),
  ...Object.values(tagsEpics),
  ...Object.values(articleListEpics),
  ...Object.values(articleEpics),
  ...Object.values(profileEpics),
);
