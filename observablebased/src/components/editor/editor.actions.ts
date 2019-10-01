import { createStandardAction } from 'typesafe-actions';

export const resetEditor = createStandardAction('RESET_EDITOR')<string>();
