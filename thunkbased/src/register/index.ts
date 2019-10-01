import { store, RootState } from '../store';
import registration from './registration.reducers';
import { RegistrationContainer } from './registration.container';

store.addReducers({
  registration,
});

export const registrationStateSelector = (state: RootState) =>
  state.registration;

export { RegistrationContainer };
