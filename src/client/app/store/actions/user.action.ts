import { createAction, props } from '@ngrx/store';

const LABEL = '[User]';

export const remove = createAction(`${LABEL} remove`);

export const initialize = createAction(
    `${LABEL} initialize`,
    props<{ login: boolean }>()
);

export const updateLanguage = createAction(
    `${LABEL} updateLanguage`,
    props<{ language: string }>()
);

export const setVersion = createAction(
    `${LABEL} setVersion`,
    props<{ version: string }>()
);
