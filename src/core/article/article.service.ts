import { API_ROOT } from '../constants';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import {
  ArticleResponse,
  Article,
  NewArticle,
} from '../../models/article.model';

interface FetchCommentsResult {
  comments: Comment[];
}

interface AddCommentsResult {
  comment: Comment;
}

interface AddCommentsRequest {
  comment: {
    body: string
  };
}

interface AddArticleRequest {
  article: NewArticle;
}

interface UpdateArticleRequest {
  article: Article;
}

export function fetchArticle(articleSlug: string): Observable<Article> {
  return fromFetch(`${API_ROOT}/articles/${articleSlug}`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
    },
  }).pipe(
    switchMap(async response => {
      const data: ArticleResponse = await response.json();
      return data.article;
    }),
    catchError(err => throwError(err)),
  );
}

export function addArticle(article: NewArticle, token: string) {
  const body: AddArticleRequest = {
    article,
  };
  return fromFetch(`${API_ROOT}/articles/`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  }).pipe(
    switchMap(async response => {
      const data: ArticleResponse = await response.json();
      return data.article;
    }),
    catchError(err => throwError(err)),
  );
}

export function updateArticle(article: Article, token: string) {
  const body: UpdateArticleRequest = {
    article,
  };
  return fromFetch(`${API_ROOT}/articles/${article.slug}`, {
    method: 'put',
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  }).pipe(
    switchMap(async response => {
      const data: ArticleResponse = await response.json();
      return data.article;
    }),
    catchError(err => throwError(err)),
  );
}

export function deleteArticle(
  articleSlug: string,
  token: string,
): Observable<void> {
  return fromFetch(`${API_ROOT}/articles/${articleSlug}`, {
    method: 'delete',
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).pipe(
    map(() => {
      return;
    }),
    catchError(err => throwError(err)),
  );
}

export function fetchComments(articleSlug: string): Observable<Comment[]> {
  return fromFetch(`${API_ROOT}/articles/${articleSlug}/comments`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
    },
  }).pipe(
    switchMap(async response => {
      const data: FetchCommentsResult = await response.json();
      return data.comments;
    }),
    catchError(err => throwError(err)),
  );
}

export function deleteComment(
  articleSlug: string,
  commentId: number,
  token: string,
): Observable<void> {
  return fromFetch(
    `${API_ROOT}/articles/${articleSlug}/comments/${commentId}`,
    {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        Authorization: `Token ${token}`,
      },
    },
  ).pipe(
    map(() => {
      return;
    }),
    catchError(err => throwError(err)),
  );
}

export function addComment(
  articleSlug: string,
  commentBody: string,
  token: string,
): Observable<Comment> {
  const body: AddCommentsRequest = {
    comment: {
      body: commentBody,
    },
  };
  return fromFetch(`${API_ROOT}/articles/${articleSlug}/comments/`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  }).pipe(
    switchMap(async res => {
      const commentResult: AddCommentsResult = await res.json();
      return commentResult.comment;
    }),
    catchError(err => throwError(err)),
  );
}
