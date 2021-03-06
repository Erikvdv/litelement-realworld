export enum ArticleListType {
  all = 'ALL',
  feed = 'FEED',
  favorited = 'FAVORITED',
  my = 'MY',
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
