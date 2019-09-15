import UniversalRouter, { Route } from 'universal-router';
import { navigate } from './navigation/navigation.actions';
import { RootRoute } from './navigation/navigation.reducer';
import store from '../../core/store';
import { articleRoutes } from '../article/article.router';
import { profileRoutes } from '../profile/profile.router';
import { editorRoutes } from '../editor/editor.router';

const routes: Route[] = [
  {
    path: '',
    action: async () => {
      await import('../home');
      store.dispatch(navigate(RootRoute.home));
    },
  },
  {
    path: '/home',
    action: async () => {
      await import('../home');
      store.dispatch(navigate(RootRoute.home));
    },
  },
  ...articleRoutes,
  ...editorRoutes,
  ...profileRoutes,
  {
    path: '/register',
    action: async () => {
      await import('../registration');
      return store.dispatch(navigate(RootRoute.register));
    },
  },
  {
    path: '/login',
    action: async () => {
      await import('../login');
      return store.dispatch(navigate(RootRoute.login));
    },
  },
  {
    path: '/settings',
    action: async () => {
      await import('../settings');
      return store.dispatch(navigate(RootRoute.settings));
    },
  },
  {
    path: '(.*)',
    action: async () => {
      console.log('page not found');
      await import('../home');
      store.dispatch(navigate(RootRoute.home));
    },
  },
];

export const router = new UniversalRouter(routes);
