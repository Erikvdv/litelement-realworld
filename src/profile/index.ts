import { ProfileContainer } from './profile.container';
import { fetchProfile } from './profile.actions';
import { store } from '../store';
import profile from './profile.reducer';

store.addReducers({
    profile,
});

export { ProfileContainer, fetchProfile };
