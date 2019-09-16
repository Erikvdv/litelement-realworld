import { combineEpics } from 'redux-observable';

import * as userEpics from '../core/user/user.epic';
import * as homeEpics from '../components/home/home.epics';
import * as articleListEpics from '../components/shared/article-list/article-list.epics';
import * as articleEpics from '../components/article/article.epics';
import * as profileEpics from '../components/profile/profile.epics';

export default combineEpics(
  ...Object.values(userEpics),
  ...Object.values(homeEpics),
  ...Object.values(articleListEpics),
  ...Object.values(articleEpics),
  ...Object.values(profileEpics),
);
