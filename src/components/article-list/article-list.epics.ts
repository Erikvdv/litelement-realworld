import { Epic } from 'redux-observable';
import { RootAction, isActionOf, RootState } from 'typesafe-actions';
import { filter, mergeMap, map, catchError, delay } from 'rxjs/operators';
import {
  articleListFetch,
  articleListSetQuery,
  articleListSetPage,
  articleSetFavorite,
  articleUnsetFavorite,
} from './article-list.actions';
import * as articleListService from './article-list.service';
import store from '../../store';
import { navigate } from '../../core/navigation/navigation.actions';
import { RootRoute } from '../../core/navigation/navigation.reducer';
import { of } from 'rxjs';

export const fetchArticleListEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf(articleListFetch.request)),
    mergeMap(action =>
      articleListService
        .fetchArticles(action.payload, store.getState().user.token)
        .pipe(
          map(res => articleListFetch.success(res)),
          catchError(() => articleListFetch.failure),
        ),
    ),
  );

export const setQueryEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(articleListSetQuery)),
    map(action => articleListFetch.request(action.payload)),
  );

export const setPage: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(articleListSetPage)),
    map(_ =>
      articleListFetch.request(store.getState().articleList.articleListQuery),
    ),
  );

export const setFavoriteEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  store$,
) => {
  //   const token = store$.value.user.token;

  return action$.pipe(
    filter(isActionOf(articleSetFavorite.request)),
    delay(100),
    mergeMap(action => {
      if (!store$.value.user.token) {
        history.pushState(null, '', '/login');
        return of(navigate(RootRoute.login));
      } else {
        return articleListService
          .setFavorite(action.payload, store$.value.user.token)
          .pipe(
            map(res => articleSetFavorite.success(res)),
            catchError(() => articleSetFavorite.failure),
          );
      }
    }),
  );
};

export const unsetFavoriteEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  store$,
) => {
  return action$.pipe(
    filter(isActionOf(articleUnsetFavorite.request)),
    delay(100),
    mergeMap(action => {
      if (!store$.value.user.token) {
        history.pushState(null, '', '/login');
        return of(navigate(RootRoute.login));
      } else {
        return articleListService
          .deleteFavorite(action.payload, store$.value.user.token)
          .pipe(
            map(res => articleUnsetFavorite.success(res)),
            catchError(() => articleUnsetFavorite.failure),
          );
      }
    }),
  );
};
