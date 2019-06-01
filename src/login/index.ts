import { store } from '../store';
import login from './login.reducer';
import { loginRefresh } from './login.actions';

store.addReducers({
    login
});



export { loginRefresh };
