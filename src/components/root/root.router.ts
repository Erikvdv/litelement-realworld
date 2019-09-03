import UniversalRouter, { Route } from 'universal-router';
import { navigate } from './navigation/navigation.actions';
import { RootRoute } from './navigation/navigation.reducer';
import store from '../../core/store';

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
  {
    path: '/article',
    action: () => store.dispatch(navigate(RootRoute.article)),
  },
  {
    path: '/editor',
    action: () => store.dispatch(navigate(RootRoute.editor)),
  },
  {
    path: '/profile',
    action: () => store.dispatch(navigate(RootRoute.profile)),
  },
  {
    path: '/register',
    action: () => store.dispatch(navigate(RootRoute.register)),
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
    action: () => store.dispatch(navigate(RootRoute.settings)),
  },
  {
    path: '(.*)',
    action: async () => {
      await import('../home');
      store.dispatch(navigate(RootRoute.home));
    },
  },
];

export const router = new UniversalRouter(routes);
