import { ProfileContainer } from './profile.container';
import { fetchProfile } from './profile.actions';
import { store } from '../store';
import profile from './profile.reducer';
import { SettingsContainer } from './settings.container';
import('../shared/article-list');
store.addReducers({
  profile,
});

export { ProfileContainer, SettingsContainer, fetchProfile };
