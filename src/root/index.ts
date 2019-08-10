import { store } from '../store';
import login from '../login/login.reducer';
import { AppRoot } from './root.container';

import('../shared/header/header.component');
// import('../shared/footer/footer.component');

store.addReducers({
  login,
});

export { AppRoot };
