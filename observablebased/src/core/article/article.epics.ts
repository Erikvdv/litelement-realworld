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
  addArticle,
  updateArticle,
} from './article.actions';
import { router } from '../../root.router';
import { RootRoute } from '../navigation/navigation.reducer';
import { navigate } from '../navigation/navigation.actions';

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

export const addArticleEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  store$,
) =>
  action$.pipe(
    filter(isActionOf(addArticle.request)),
    mergeMap(action =>
      articleService.addArticle(action.payload, store$.value.user.token!).pipe(
        map(res => {
          return addArticle.success(res);
        }),
        catchError(() => addArticle.failure),
      ),
    ),
  );

export const updateArticleEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  store$,
) =>
  action$.pipe(
    filter(isActionOf(updateArticle.request)),
    mergeMap(action =>
      articleService
        .updateArticle(action.payload, store$.value.user.token!)
        .pipe(
          map(res => {
            return updateArticle.success(res);
          }),
          catchError(() => updateArticle.failure),
        ),
    ),
  );

export const upsertArticleSuccessEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf([updateArticle.success, addArticle.success])),
    map(action => {
      history.pushState(null, '', `/article/${action.payload.slug}`);
      router.resolve({ pathname: location.pathname });
      return navigate(RootRoute.article);
    }),
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
