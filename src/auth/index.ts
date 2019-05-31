import { store, RootState } from '../store';
import registration from './registration.reducers';
import login from './login.reducer';
import { loginRefresh } from './login.actions';

store.addReducers({
    registration,
    login
});


export const registrationStateSelector = (state: RootState) => state.registration;

export { loginRefresh };


