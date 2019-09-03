import { Epic } from 'redux-observable';
import { RootAction, isActionOf, RootState } from 'typesafe-actions';
import { filter, mergeMap, map, catchError, delay } from 'rxjs/operators';
import {
  tags,
  selectTab,
  setQuery,
  selectTag,
  initiateTab,
} from './home.actions';
import * as tagsService from './home.service';
import { ArticleListType } from '../../models';
import { SelectedTab } from './home.models';
import { navigate } from '../root/navigation/navigation.actions';
import { RootRoute } from '../root/navigation/navigation.reducer';
import { router } from '../root/root.router';

export const fetchtagsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(tags.request)),
    mergeMap(() =>
      tagsService.fetchTags().pipe(
        map(res => tags.success(res)),
        catchError(() => tags.failure),
      ),
    ),
  );

export const selectTabEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  store$,
) =>
  action$.pipe(
    filter(isActionOf(selectTab)),
    delay(5),
    map(action => {
      switch (action.payload) {
        case SelectedTab.all: {
          return setQuery({
            type: ArticleListType.all,
            filters: { limit: 10 },
          });
        }
        case SelectedTab.feed: {
          if (!store$.value.user.isLoggedin) {
            history.pushState(null, '', '/login');
            router.resolve({ pathname: location.pathname });
            return navigate(RootRoute.login);
          } else {
            return setQuery({
              type: ArticleListType.feed,
              filters: { limit: 10 },
            });
          }
        }
        default:
          return setQuery({
            type: ArticleListType.all,
            filters: { limit: 10 },
          });
      }
    }),
  );

export const selectTagEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(selectTag)),
    map(action => {
      return setQuery({
        type: ArticleListType.all,
        filters: {
          tag: action.payload,
          limit: 10,
        },
      });
    }),
  );

export const initiateTabEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  store$,
) =>
  action$.pipe(
    filter(isActionOf(initiateTab)),
    map(() => {
      return selectTab(
        store$.value.user.isLoggedin ? SelectedTab.feed : SelectedTab.all,
      );
    }),
  );
