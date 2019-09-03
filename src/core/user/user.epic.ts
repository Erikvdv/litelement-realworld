import { Epic } from 'redux-observable';
import { RootAction, isActionOf, RootState } from 'typesafe-actions';
import { filter, mergeMap, map, catchError } from 'rxjs/operators';
import { autoLogin, userLogin, autoLoginInitiate } from './user.actions';
import * as api from './user.service';
import { of } from 'rxjs';
import { User } from '../../models/user.model';
import { Errors } from '../../models';
import { navigate } from '../../components/root/navigation/navigation.actions';
import { RootRoute } from '../../components/root/navigation/navigation.reducer';

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
      return navigate(RootRoute.home);
    }),
  );
