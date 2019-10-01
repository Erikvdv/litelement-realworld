import { createStandardAction } from 'typesafe-actions';
import { RootRoute } from './navigation.reducer';

export const navigate = createStandardAction('ROOT_NAVIGATION_REQUEST')<
  RootRoute
>();
