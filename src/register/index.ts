import { store, RootState } from '../store';
import registration from './registration.reducers';

store.addReducers({
    registration
});

export const registrationStateSelector = (state: RootState) => state.registration;
