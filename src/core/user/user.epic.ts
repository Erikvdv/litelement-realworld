import { Epic } from 'redux-observable';
import { RootAction, isActionOf, RootState } from 'typesafe-actions';
import { filter, mergeMap, map, catchError, delay } from 'rxjs/operators';
import {
  autoLogin,
  userLogin,
  autoLoginInitiate,
  userRegistration,
  updateUser,
  logout,
} from './user.actions';
import * as api from './user.service';
import { of } from 'rxjs';
import { User } from '../../models/user.model';
import { Errors } from '../../models';
import { navigate } from '../../components/root/navigation/navigation.actions';
import { RootRoute } from '../../components/root/navigation/navigation.reducer';
import { router } from '../../components/root/root.router';

export const autoLoginInitiateEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf(autoLoginInitiate)),
    map(() => {
      const userstring = localStorage.getItem('user');
      if (userstring) {
        return autoLogin.request();
      } else {
        return autoLogin.cancel();
      }
    }),
  );

export const autoLoginEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(autoLogin.request)),
    mergeMap(() => {
      const userstring = localStorage.getItem('user');
      if (userstring) {
        const user: User = JSON.parse(userstring);
        return api.autoLogin(user.token).pipe(
          map(res => autoLogin.success(res)),
          catchError(() => of(autoLogin.failure())),
        );
      } else {
        return of(autoLogin.failure());
      }
    }),
  );

export const userLoginRequestEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf(userLogin.request)),
    map(action => {
      console.log('action ' + action.payload);
      return action;
    }),
    mergeMap(action =>
      api.userLogin(action.payload).pipe(
        map(res => {
          if (res.id) {
            return userLogin.success(res as User);
          } else {
            return userLogin.failure(res as Errors);
          }
        }),
        catchError(_ => of(userLogin.failure({}))),
      ),
    ),
  );
export const userRegistrationRequestEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf(userRegistration.request)),
    map(action => {
      console.log('action ' + action.payload);
      return action;
    }),
    mergeMap(action =>
      api.userLogin(action.payload).pipe(
        map(res => {
          if (res.id) {
            return userRegistration.success(res as User);
          } else {
            return userRegistration.failure(res as Errors);
          }
        }),
        catchError(_ => of(userRegistration.failure({}))),
      ),
    ),
  );

export const userLoginSuccessEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf(userLogin.success)),
    map(action => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      window.history.pushState({}, '', '/');
      router.resolve({ pathname: location.pathname });
      return navigate(RootRoute.home);
    }),
  );

export const userRegistrationSuccessEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf(userRegistration.success)),
    delay(5),
    map(action => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      window.history.pushState({}, '', '/');
      router.resolve({ pathname: location.pathname });
      return navigate(RootRoute.home);
    }),
  );

export const updateUserEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  store$,
) =>
  action$.pipe(
    filter(isActionOf(updateUser.request)),
    mergeMap(action =>
      api.updateUser(action.payload, store$.value.user.token!).pipe(
        map(res => {
          if (res.id) {
            return updateUser.success(res as User);
          } else {
            return updateUser.failure(res as Errors);
          }
        }),
        catchError(() => updateUser.failure),
      ),
    ),
  );

export const updateUserSuccessEpic: Epic<
  RootAction,
  RootAction,
  RootState
> = action$ =>
  action$.pipe(
    filter(isActionOf(updateUser.success)),
    map(action => {
      history.pushState(null, '', `/profile/${action.payload.username}`);
      router.resolve({ pathname: location.pathname });
      return navigate(RootRoute.profile);
    }),
  );

export const logoutEpic: Epic<RootAction, RootAction, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(logout)),
    map(() => {
      localStorage.removeItem('user');
      window.history.pushState({}, '', '/');
      router.resolve({ pathname: location.pathname });
      return navigate(RootRoute.home);
    }),
  );
