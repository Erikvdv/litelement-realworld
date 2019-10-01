import { Route } from 'universal-router';
import store from '../../store';

import { navigate } from '../../core/navigation/navigation.actions';
import { RootRoute } from '../../core/navigation/navigation.reducer';
import { setProfileUsername, fetchProfile } from './profile.actions';

export const profileRoutes: Route[] = [
  {
    path: '/profile/:username',
    action: async context => {
      await import('./index');
      store.dispatch(fetchProfile.request(context.params.username));
      store.dispatch(setProfileUsername(context.params.username));
      return store.dispatch(navigate(RootRoute.profile));
    },
  },
];
