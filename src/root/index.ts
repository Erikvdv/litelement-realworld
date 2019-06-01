import { store } from '../store';
import login from '../login/login.reducer';
import { AppRoot } from './root.container';

store.addReducers({
    login
});

export { AppRoot };

