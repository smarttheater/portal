import { getProject } from '../app/functions/util.function';

export interface IProfile {
    key: string;
    value: string;
    required?: boolean;
    pattern?: RegExp;
    maxLength?: number;
    minLength?: number;
    label?: { ja: string; en: string };
    inputType?: 'input' | 'textarea' | 'select';
    option?: {
        label: { ja: string; en: string };
        value: string;
    }[];
}

/**
 * 環境変数
 */
export interface IEnvironment {
    /**
     * 本番判定
     */
    production: boolean;
    /**
     * アプリケーションタイトル
     */
    APP_TITLE: string;
    /**
     * プライマリーカラー
     */
    PRIMARY_COLOR: string;
    /**
     * ストレージの名前
     */
    STORAGE_NAME: string;
    /**
     * ストレージの種類
     */
    STORAGE_TYPE: string;
    /**
     * ベースURL
     */
    BASE_URL: string;
    /**
     * 対応言語
     */
    LANGUAGE: string[];
    /**
     * ヘッダーメニュー表示
     */
    HEADER_MENU: boolean;
    /**
     * ヘッダーメニューの中身
     */
    HEADER_MENU_SCOPE: string[];
    /**
     * フッター会社概要URL
     */
    FOOTER_COMPANY_URL: string;
    /**
     * フッター特定商取引法に基づく表記URL
     */
    FOOTER_LAW_URL: string;
    /**
     * フッタープライバシーポリシーURL
     */
    FOOTER_PRIVACY_POLICY_URL: string;
    /**
     * フッターリンク
     */
    FOOTER_LINK: { url: string; name: { ja: string; en: string } }[];
    /**
     * タグマネージャーID
     */
    GTM_ID: string;
    /**
     * アナリティクスID
     */
    ANALYTICS_ID: string;
}

export const isProduction = document.querySelector('body.production') !== null;

const defaultEnvironment: IEnvironment = {
    production: false,
    APP_TITLE: '',
    PRIMARY_COLOR: 'steelblue',
    STORAGE_NAME: 'PORTAL-STATE',
    STORAGE_TYPE: 'sessionStorage',
    BASE_URL: '/reservation',
    LANGUAGE: ['ja'],
    GTM_ID: '',
    ANALYTICS_ID: '',
    HEADER_MENU: true,
    HEADER_MENU_SCOPE: ['auth'],
    FOOTER_COMPANY_URL: '',
    FOOTER_LAW_URL: '',
    FOOTER_PRIVACY_POLICY_URL: '',
    FOOTER_LINK: [],
};

export function getEnvironment(): IEnvironment {
    const environment = {
        ...defaultEnvironment,
        STORAGE_NAME:
            getProject().projectId === ''
                ? 'PORTAL-STATE'
                : `${getProject().projectId.toUpperCase()}-PORTAL-STATE`,
        ...(<any>window).environment,
        production: document.querySelector('body.production') !== null,
    };
    return environment;
}
