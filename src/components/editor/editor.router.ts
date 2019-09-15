import { Route } from 'universal-router';
import store from '../../core/store';

import { resetEditor } from './editor.actions';
import { navigate } from '../root/navigation/navigation.actions';
import { RootRoute } from '../root/navigation/navigation.reducer';
import { fetchArticle, resetArticle } from '../article/article.actions';

export const editorRoutes: Route[] = [
  {
    path: '/editor',
    action: async () => {
      await import('./index');
      store.dispatch(resetArticle());
      store.dispatch(resetEditor(''));
      return store.dispatch(navigate(RootRoute.editor));
    },
  },
  {
    path: '/editor/:slug',
    action: async context => {
      await import('./index');
      store.dispatch(resetArticle());
      store.dispatch(resetEditor(context.params.slug));
      store.dispatch(fetchArticle.request(context.params.slug));
      return store.dispatch(navigate(RootRoute.editor));
    },
  },
];
