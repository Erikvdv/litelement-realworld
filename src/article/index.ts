import { store } from '../store';
import article from './article.reducer';
import { fetchArticle } from './article.actions';

store.addReducers({
    article
  });

export { fetchArticle };
