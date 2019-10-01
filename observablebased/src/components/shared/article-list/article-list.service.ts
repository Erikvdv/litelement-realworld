import { API_ROOT } from '../../../core/constants';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import {
  ArticleListQuery,
  ArticleListType,
  ArticleListResponse,
} from '../../../models/article-list-query.model';
import { ArticleResponse, Article } from '../../../models/article.model';

interface TagsResponse {
  tags: [];
}

function getAppSlug(query: ArticleListQuery) {
  let slug = '';
  query.type === ArticleListType.feed ? (slug = 'feed/?') : (slug = '?');
  Object.keys(query.filters).map(key => {
    if (query.filters[key]) {
      slug = slug + `${key}=${query.filters[key]}&`;
    }
  });
  return slug.slice(0, -1);
}

export function fetchTags(): Observable<string[]> {
  return fromFetch(`${API_ROOT}/tags`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
    },
  }).pipe(
    switchMap(async response => {
      const res: TagsResponse = await response.json();
      return res.tags;
    }),
    catchError(err => throwError(err)),
  );
}

export function fetchArticles(
  query: ArticleListQuery,
  token?: string,
): Observable<ArticleListResponse> {
  let headers: { [key: string]: string } = {};
  if (token) {
    headers = { Authorization: `Token ${token}` };
  }
  const slug = getAppSlug(query);

  return fromFetch(`${API_ROOT}/articles/${slug}`, {
    method: 'get',
    headers: headers,
  }).pipe(
    switchMap(async response => {
      const res: ArticleListResponse = await response.json();
      return res;
    }),
    catchError(err => throwError(err)),
  );
}

export function setFavorite(slug: string, token: string): Observable<Article> {
  let headers: { [key: string]: string } = {};
  if (token) {
    headers = { Authorization: `Token ${token}` };
  }

  return fromFetch(`${API_ROOT}/articles/${slug}/favorite`, {
    method: 'POST',
    headers: headers,
  }).pipe(
    switchMap(async response => {
      const res: ArticleResponse = await response.json();
      return res.article;
    }),
    catchError(err => throwError(err)),
  );
}

export function deleteFavorite(
  slug: string,
  token: string,
): Observable<Article> {
  let headers: { [key: string]: string } = {};
  if (token) {
    headers = { Authorization: `Token ${token}` };
  }

  return fromFetch(`${API_ROOT}/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: headers,
  }).pipe(
    switchMap(async response => {
      return ((await response.json()) as ArticleResponse).article;
    }),
    catchError(err => throwError(err)),
  );
}
