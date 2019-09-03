import { combineEpics } from 'redux-observable';

import * as authEpics from '../user/user.epic';
import * as tagsEpics from '../../components/home/home.epic';
import * as articleListEpics from '../../components/article-list/article-list.epics';

export default combineEpics(
  ...Object.values(authEpics),
  ...Object.values(tagsEpics),
  ...Object.values(articleListEpics),
);
