import { Epic } from 'redux-observable';
import { RootAction, isActionOf, RootState } from 'typesafe-actions';
import { filter, mergeMap, map, catchError } from 'rxjs/operators';
import { fetchProfile, followProfile, unfollowProfile } from './profile.actions';

import * as profileService from './profile.service';

export const fetchProfileEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  store$,
) =>
  action$.pipe(
    filter(isActionOf(fetchProfile.request)),
    mergeMap(action =>
      profileService
        .fetchProfile(action.payload, store$.value.user.token!)
        .pipe(
          map(res => fetchProfile.success(res)),
          catchError(() => fetchProfile.failure),
        ),
    ),
  );

export const followProfileEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  store$,
) =>
  action$.pipe(
    filter(isActionOf(followProfile.request)),
    mergeMap(action =>
      profileService
        .followProfile(action.payload, store$.value.user.token!)
        .pipe(
          map(res => followProfile.success(res)),
          catchError(() => followProfile.failure),
        ),
    ),
  );

export const unfollowProfileEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  store$,
) =>
  action$.pipe(
    filter(isActionOf(unfollowProfile.request)),
    mergeMap(action =>
      profileService
        .unfollowProfile(action.payload, store$.value.user.token!)
        .pipe(
          map(res => unfollowProfile.success(res)),
          catchError(() => unfollowProfile.failure),
        ),
    ),
  );
