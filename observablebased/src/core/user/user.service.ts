import { fromFetch } from 'rxjs/fetch';
import { API_ROOT } from '../constants';
import { switchMap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { UserResponse, User, UserRegistration } from '../../models/user.model';
import { UserLogin } from '../../components/login/login.models';
import { Errors } from '../../models';

interface UpdateUserRequest {
  user: User;
}

export function autoLogin(token: string): Observable<User> {
  return fromFetch(`${API_ROOT}/user`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      authorization: 'Token ' + token,
    },
  }).pipe(
    switchMap(async response => {
      const res: UserResponse = await response.json();
      return res.user;
    }),
    catchError(err => throwError(err)),
  );
}

export function userLogin(credentials: UserLogin): Observable<User | Errors> {
  return fromFetch(`${API_ROOT}/users/login`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ user: credentials }),
  }).pipe(
    switchMap(async response => {
      if (response.ok) {
        const res: UserResponse = await response.json();
        return res.user;
      }
      return (await response.json()).errors as Errors;
    }),
    catchError(err => throwError(err)),
  );
}

export function userRegistration(
  user: UserRegistration,
): Observable<User | Errors> {
  return fromFetch(`${API_ROOT}/users`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ user: user }),
  }).pipe(
    switchMap(async response => {
      if (response.ok) {
        const res: UserResponse = await response.json();
        return res.user;
      }
      return (await response.json()).errors as Errors;
    }),
    catchError(err => throwError(err)),
  );
}

export function updateUser(
  user: User,
  token: string,
): Observable<User | Errors> {
  const body: UpdateUserRequest = {
    user,
  };
  return fromFetch(`${API_ROOT}/user`, {
    method: 'put',
    headers: {
      Authorization: `Token ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  }).pipe(
    switchMap(async response => {
      if (response.ok) {
        const res: UserResponse = await response.json();
        return res.user;
      }
      return (await response.json()).errors as Errors;
    }),
    catchError(err => throwError(err)),
  );
}
