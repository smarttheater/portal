import * as libphonenumber from 'libphonenumber-js';
import {
    BsDatepickerContainerComponent,
    BsDatepickerDirective,
} from 'ngx-bootstrap/datepicker';
import { CellHoverEvent } from 'ngx-bootstrap/datepicker/models';

/**
 * 電話番号変換
 */
export function formatTelephone(
    telephone: string,
    format?: libphonenumber.NumberFormat
) {
    if (telephone === undefined) {
        return '';
    }
    const parsedNumber = new RegExp(/^\+/).test(telephone)
        ? libphonenumber.parse(telephone)
        : libphonenumber.parse(telephone, 'JP');
    format = format === undefined ? 'International' : format;

    return libphonenumber.format(parsedNumber, format).replace(/\s/g, '');
}

/**
 * 全角変換
 */
export function toFull(value: string) {
    return value.replace(/[A-Za-z0-9]/g, (s) => {
        return String.fromCharCode(s.charCodeAt(0) + 65248);
    });
}

/**
 * 半角変換
 */
export function toHalf(value: string) {
    return value.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
    });
}

/**
 * リトライ
 */
export async function retry<T>(params: {
    process: Function;
    interval: number;
    limit: number;
}) {
    const { process, interval, limit } = params;
    let count = 0;
    return new Promise<T>(async (resolve, reject) => {
        const timerProcess = () => {
            setTimeout(async () => {
                count++;
                try {
                    const result = await process();
                    resolve(result);
                } catch (error) {
                    if (count >= limit) {
                        reject(error);
                        return;
                    }
                    timerProcess();
                }
            }, interval);
        };
        try {
            const result = await process();
            resolve(result);
        } catch (error) {
            timerProcess();
        }
    });
}

/**
 * ミリ秒待ち
 * @param time
 */
export async function sleep(time: number = 100) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

/**
 * クエリストリング変換
 */
export function buildQueryString(data: Object) {
    let key, value, type, i, max;
    const encode = encodeURIComponent;
    let query = '';
    for (key of Object.keys(data)) {
        value = (<any>data)[key];
        type =
            typeof value === 'object' && value instanceof Array
                ? 'array'
                : typeof value;
        switch (type) {
            case 'undefined':
                break;
            case 'array':
                // 配列
                for (i = 0, max = value.length; i < max; i++) {
                    query += key + '[]';
                    query += '=';
                    query += encode(value[i]);
                    query += '&';
                }
                query = query.substr(0, query.length - 1);
                break;
            case 'object':
                // ハッシュ
                for (i of Object.keys(value)) {
                    if (value[i] === undefined || value[i] === '') {
                        break;
                    }
                    query += key + '[' + i + ']';
                    query += '=';
                    query += encode(value[i]);
                    query += '&';
                }
                query = query.substr(0, query.length - 1);
                break;
            default:
                if (value === '') {
                    break;
                }
                query += key;
                query += '=';
                query += encode(value);
                break;
        }
        query += '&';
    }
    query = query.substr(0, query.length - 1);
    return query;
}

/**
 * iOS bugfix（2回タップしないと選択できない）
 */
export function iOSDatepickerTapBugFix(
    container: BsDatepickerContainerComponent,
    datepickerDirectives: BsDatepickerDirective[]
) {
    const dayHoverHandler = container.dayHoverHandler;
    const hoverWrapper = (event: CellHoverEvent) => {
        const { cell, isHovered } = event;
        if (
            isHovered &&
            !!navigator.platform &&
            /iPad|iPhone|iPod/.test(navigator.platform) &&
            'ontouchstart' in window
        ) {
            datepickerDirectives.forEach((d) =>
                (<any>d)._datepickerRef.instance.daySelectHandler(cell)
            );
        }

        return dayHoverHandler(event);
    };
    container.dayHoverHandler = hoverWrapper;
}

/**
 * ストリーミングダウンロード
 */
// export async function streamingDownload<T>(stream: ReadableStream<T>) {
//     const reader = stream.getReader();
//     const decoder = new TextDecoder();
//     let streamText = '';
//     return new Promise<string>(async (resolve, reject) => {
//         try {
//             const readChunk = async (chunk: { done: boolean; value: any; }) => {
//                 if (chunk.done) {
//                     resolve(streamText);
//                     return;
//                 }
//                 streamText += decoder.decode(chunk.value);
//                 await readChunk(await reader.read());
//             };
//             await readChunk(await reader.read());
//         } catch (error) {
//             reject(error);
//         }
//     });
// }

/**
 * 文字列をBLOB変換
 */
export function string2blob(value: string, options?: BlobPropertyBag) {
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    return new Blob([bom, value], options);
}

/**
 * パラメータ取得
 */
export function getParameter<T>() {
    const result: any = {};
    const params = location.search.replace('?', '').split('&');
    for (let i = 0; i < params.length; i++) {
        const param = params[i].split('=');
        const key = param[0];
        const value = param[1];
        if (key && value) {
            result[key] = value;
        }
    }
    return <T>result;
}

/**
 * プロジェクト情報取得
 */
export function getProject() {
    const project = sessionStorage.getItem('PROJECT');
    const defaultProject = {
        projectId: '',
        transactionUrl: '',
        storageUrl: {
            common: '',
            application: '',
        },
    };
    if (project === null || project === '') {
        return defaultProject;
    }
    return {
        ...defaultProject,
        ...(<
            {
                projectId: string;
                transactionUrl: string;
                storageUrl: {
                    common: string;
                    application: string;
                };
            }
        >JSON.parse(project)),
    };
}

/**
 * ランダム英数字生成
 */
export function createRandomString(length: number, regExp: RegExp) {
    const str =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.replace(
            regExp,
            ''
        );
    let result = '';
    for (let i = 0; i < length; i++) {
        result += str[Math.floor(Math.random() * str.length)];
    }
    return result;
}

/**
 * ファイル存在判定
 */
export async function isFile(url: string) {
    const fetchResult = await fetch(url, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'charset=utf-8',
        },
    });
    return fetchResult.ok;
}

/**
 * オブジェクトディープコピー
 */
export function deepCopy<T>(obj: any) {
    return <T>JSON.parse(JSON.stringify(obj));
}

/**
 * 認証リダイレクト先取得
 */
export function getAuthRedirectUrl() {
    const url = sessionStorage.getItem('AUTH_REDIRECT_URL');
    return url === null ? undefined : decodeURIComponent(url);
}

/**
 * 認証リダイレクト先設定
 */
export function setAuthRedirectUrl(value: string) {
    sessionStorage.setItem('AUTH_REDIRECT_URL', value);
}

/**
 * 認証リダイレクト先削除
 */
export function removeAuthRedirectUrl() {
    sessionStorage.removeItem('AUTH_REDIRECT_URL');
}
