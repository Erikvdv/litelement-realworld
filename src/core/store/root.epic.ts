import { combineEpics } from 'redux-observable';

import * as authEpics from '../user/user.epic';

export default combineEpics(...Object.values(authEpics));
