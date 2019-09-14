import { Article } from './article.model';

export enum ArticleListType {
  all = 'ALL',
  feed = 'FEED',
}

export interface ArticleListQuery {
  type: ArticleListType;
  filters: {
    tag?: string
    author?: string
    favorited?: string
    limit: number
    offset?: number
    [key: string]: string | number | undefined
  };
}

export interface ArticleListResponse {
  articles: Article[];
  articlesCount: number;
}
