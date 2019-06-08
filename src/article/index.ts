import { store } from '../store';
import article from './article.reducer';
import { fetchArticle } from './article.actions';
import { ArticleContainer } from './article.container';

store.addReducers({
  article
});

import('./article-comment.component');

export { fetchArticle, ArticleContainer };
