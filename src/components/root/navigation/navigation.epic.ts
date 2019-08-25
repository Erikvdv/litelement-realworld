import { RootAction, isActionOf } from 'typesafe-actions';
import { Epic } from 'redux-observable';
import { navigate } from './navigation.actions';
import { filter } from 'rxjs/operators';

export const navigationEpic: Epic<RootAction, RootAction> = action$ =>
  action$.pipe(
    filter(isActionOf(navigate)),
    // tslint:disable-next-line: deprecation
  );
