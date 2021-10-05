import { Action, createReducer, on } from '@ngrx/store';
import { IState } from '.';
import { userAction } from '../actions';

export interface IUserState {
    /**
     * ログイン
     */
    login: boolean;
    /**
     * 言語
     */
    language: string;
    /**
     * バージョン
     */
    version?: string;
}

export const userInitialState: IUserState = {
    login: false,
    language: 'ja',
};

export function reducer(initialState: IState, action: Action) {
    return createReducer(
        initialState,
        on(userAction.remove, (state) => {
            return {
                ...state,
                userData: {
                    login: false,
                    language: 'ja',
                },
                loading: false,
                process: '',
            };
        }),
        on(userAction.initialize, (state, payload) => {
            const login = payload.login;
            return {
                ...state,
                userData: {
                    ...state.userData,
                    login,
                },
                loading: false,
                process: '',
            };
        }),
        on(userAction.updateLanguage, (state, payload) => {
            const language = payload.language;
            return { ...state, userData: { ...state.userData, language } };
        }),
        on(userAction.setVersion, (state, payload) => {
            const version = payload.version;
            return { ...state, userData: { ...state.userData, version } };
        })
    )(initialState, action);
}
