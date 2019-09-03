import { API_ROOT } from '../../core/constants';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

interface TagsResponse {
  tags: [];
}
export function fetchTags(): Observable<string[]> {
  return fromFetch(`${API_ROOT}/tags`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
    },
  }).pipe(
    switchMap(async response => {
      const res: TagsResponse = await response.json();
      return res.tags;
    }),
    catchError(err => throwError(err)),
  );
}
