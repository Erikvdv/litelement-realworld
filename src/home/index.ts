import { store } from '../store';
import tags from './home-tags.reducer';
import articleList from '../shared/article-list/article-list.reducer';
import { fetchTags } from './home-tags.actions';
import { fetchArticleList } from '../shared/article-list/article-list.actions';

store.addReducers({
    tags,
    articleList
  });

export { fetchTags, fetchArticleList };
