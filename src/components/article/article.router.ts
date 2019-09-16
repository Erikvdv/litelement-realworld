import { Route } from 'universal-router';
import store from '../../store';
import { fetchArticle, fetchComments } from './article.actions';
import { navigate } from '../../core/navigation/navigation.actions';
import { RootRoute } from '../../core/navigation/navigation.reducer';

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
