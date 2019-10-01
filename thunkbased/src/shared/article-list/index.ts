import { store } from '../../store';
import articleList from './article-list.reducer';
import { ArticleListContainer } from './article-list.container';
import { ArticleListPaginationComponent } from './article-list-pagination.component';
import { ArticleListArticlePreviewComponent } from './article-list-article-preview.component';

store.addReducers({
    articleList
});

export {ArticleListContainer, ArticleListPaginationComponent, ArticleListArticlePreviewComponent};
