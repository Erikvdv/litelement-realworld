import { API_ROOT } from '../../core/constants';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Profile } from '../../models/profile.model';

interface FetchProfileResult {
  profile: Profile;
}

export function fetchProfile(
  username: string,
  token: string,
): Observable<Profile> {
  return fromFetch(`${API_ROOT}/profiles/${username}`, {
    method: 'get',
    headers: {
      Authorization: `Token ${token}`,
      'content-type': 'application/json',
    },
  }).pipe(
    switchMap(async response => {
      const res: FetchProfileResult = await response.json();
      return res.profile;
    }),
    catchError(err => throwError(err)),
  );
}

export function followProfile(
  username: string,
  token: string,
): Observable<Profile> {
  return fromFetch(`${API_ROOT}/profiles/${username}/follow`, {
    method: 'post',
    headers: {
      Authorization: `Token ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({}),
  }).pipe(
    switchMap(async response => {
      const res: FetchProfileResult = await response.json();
      return res.profile;
    }),
    catchError(err => throwError(err)),
  );
}

export function unfollowProfile(
  username: string,
  token: string,
): Observable<Profile> {
  return fromFetch(`${API_ROOT}/profiles/${username}/follow`, {
    method: 'delete',
    headers: {
      Authorization: `Token ${token}`,
      'content-type': 'application/json',
    },
  }).pipe(
    switchMap(async response => {
      const res: FetchProfileResult = await response.json();
      return res.profile;
    }),
    catchError(err => throwError(err)),
  );
}
