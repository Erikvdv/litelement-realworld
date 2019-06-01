import { store } from '../store';
import tags from './home-tags.reducer';
import articleList from '../shared/article-list/article-list.reducer';
import { fetchTags } from './home-tags.actions';
import { fetchArticleList } from '../shared/article-list/article-list.actions';
import { HomeContainer } from './home.container';
import { HomeTagsComponent } from './home-tags.component';
import { HomeFeedNavigationComponent } from './home-feed-navigation.component';

store.addReducers({
    tags,
    articleList
  });

export { fetchTags, fetchArticleList, HomeContainer, HomeTagsComponent, HomeFeedNavigationComponent };
