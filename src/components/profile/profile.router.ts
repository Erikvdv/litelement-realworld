import { Route } from 'universal-router';
import store from '../../core/store';

import { navigate } from '../root/navigation/navigation.actions';
import { RootRoute } from '../root/navigation/navigation.reducer';
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
