import { store } from '../store'
import { fetchArticle } from './article.actions'
import { ArticleContainer } from './article.container'
import article from './article.reducer'

store.addReducers({
    article,
})

import('./article-comment.component')

export { fetchArticle, ArticleContainer }
