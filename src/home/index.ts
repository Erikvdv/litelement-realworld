import { store } from '../store';
import home from './home.reducer';
import { HomeContainer } from './home.container';
import { HomeTagsComponent } from './home-tags.component';
import { HomeFeedNavigationComponent } from './home-feed-navigation.component';
import { HomeBannerComponent } from './home-banner.component';


store.addReducers({
    home
  });

import('../shared/article-list');

export {
  HomeContainer,
  HomeBannerComponent,
  HomeTagsComponent,
  HomeFeedNavigationComponent
};
