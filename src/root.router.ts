import UniversalRouter, { Route } from 'universal-router';
import { navigate } from './core/navigation/navigation.actions';
import { RootRoute } from './core/navigation/navigation.reducer';
import store from './store';
import { articleRoutes } from './components/article/article.router';
import { profileRoutes } from './components/profile/profile.router';
import { editorRoutes } from './components/editor/editor.router';

const routes: Route[] = [
  {
    path: '',
    action: async () => {
      await import('./components/home');
      store.dispatch(navigate(RootRoute.home));
    },
  },
  {
    path: '/home',
    action: async () => {
      await import('./components/home');
      store.dispatch(navigate(RootRoute.home));
    },
  },
  ...articleRoutes,
  ...editorRoutes,
  ...profileRoutes,
  {
    path: '/register',
    action: async () => {
      await import('./components/registration');
      return store.dispatch(navigate(RootRoute.register));
    },
  },
  {
    path: '/login',
    action: async () => {
      await import('./components/login');
      return store.dispatch(navigate(RootRoute.login));
    },
  },
  {
    path: '/settings',
    action: async () => {
      await import('./components/settings');
      return store.dispatch(navigate(RootRoute.settings));
    },
  },
  {
    path: '(.*)',
    action: async () => {
      console.log('page not found');
      await import('./components/home');
      store.dispatch(navigate(RootRoute.home));
    },
  },
];

export const router = new UniversalRouter(routes);
