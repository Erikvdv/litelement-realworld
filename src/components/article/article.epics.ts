import { Epic } from 'redux-observable';
import { RootAction, isActionOf, RootState } from 'typesafe-actions';
import { filter, mergeMap, map, catchError } from 'rxjs/operators';

import * as articleService from './article.service';
// import store from '../../core/store';
import {
  fetchArticle,
  fetchComments,
  addComment,
  deleteComment,
  deleteArticle,
} from './article.actions';
import { router } from '../root/root.router';
import { RootRoute } from '../root/navigation/navigation.reducer';
import { navigate } from '../root/navigation/navigation.actions';

export const fetchArticleEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf(fetchArticle.request)),
    mergeMap(action =>
      articleService.fetchArticle(action.payload).pipe(
        map(res => fetchArticle.success(res)),
        catchError(() => fetchArticle.failure),
      ),
    ),
  );

export const deleteArticleEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  store$,
) =>
  action$.pipe(
    filter(isActionOf(deleteArticle.request)),
    mergeMap(action =>
      articleService
        .deleteArticle(action.payload, store$.value.user.token!)
        .pipe(
          map(() => deleteArticle.success(action.payload)),
          catchError(() => deleteArticle.failure),
        ),
    ),
  );

export const deleteArticleSuccessEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf(deleteArticle.success)),
    map(() => {
      history.pushState(null, '', '/');
      router.resolve({ pathname: location.pathname });
      return navigate(RootRoute.home);
    }),
  );

export const fetchCommentsEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf(fetchComments.request)),
    mergeMap(action =>
      articleService.fetchComments(action.payload).pipe(
        map(res => fetchComments.success(res)),
        catchError(() => fetchComments.failure),
      ),
    ),
  );

export const addCommentEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  store$,
) =>
  action$.pipe(
    filter(isActionOf(addComment.request)),
    mergeMap(action =>
      articleService
        .addComment(
          store$.value.article.selectedArticle!.slug,
          action.payload,
          store$.value.user.token!,
        )
        .pipe(
          map(res => addComment.success(res)),
          catchError(() => addComment.failure),
        ),
    ),
  );

export const deleteCommentEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  store$,
) =>
  action$.pipe(
    filter(isActionOf(deleteComment.request)),
    mergeMap(action =>
      articleService
        .deleteComment(
          store$.value.article.selectedArticle!.slug,
          action.payload,
          store$.value.user.token!,
        )
        .pipe(
          map(() => deleteComment.success(action.payload)),
          catchError(() => deleteComment.failure),
        ),
    ),
  );
