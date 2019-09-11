import { Route } from 'universal-router';
import store from '../../core/store';
import { fetchArticle, fetchComments } from './article.actions';
import { navigate } from '../root/navigation/navigation.actions';
import { RootRoute } from '../root/navigation/navigation.reducer';

export const articleRoutes: Route[] = [
  {
    path: '/article/:slug',
    action: async context => {
      await import('./index');
      store.dispatch(fetchArticle.request(context.params.slug));
      store.dispatch(fetchComments.request(context.params.slug));
      return store.dispatch(navigate(RootRoute.article));
    },
  },
];
