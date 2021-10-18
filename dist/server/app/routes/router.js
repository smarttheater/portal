"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.path2Query = void 0;
/**
 * ルーティング
 */
const debug = require("debug");
const http_status_1 = require("http-status");
const path = require("path");
const auth2_model_1 = require("../models/auth2/auth2.model");
const authorize_1 = require("./api/authorize");
const util_1 = require("./api/util");
const transaction_1 = require("./transaction");
const log = debug('application: router');
exports.default = (app) => {
    app.use((_req, res, next) => {
        res.locals.APP_ENV = process.env.APP_ENV;
        next();
    });
    app.use((req, res, next) => {
        if (/\.(css|js|svg|jpg|png|gif|ico|json|html|txt|woff|woff2)/.test(req.path)) {
            res.status(404);
            res.end();
            return;
        }
        next();
    });
    app.use('/api/authorize', authorize_1.authorizeRouter);
    app.use('/api', util_1.utilRouter);
    app.use((req, res, next) => {
        if (req.xhr || req.header('Sec-Fetch-Mode') === 'cors') {
            res.status(http_status_1.NOT_FOUND);
            res.send('NOT FOUND');
            return;
        }
        next();
    });
    app.use(transaction_1.transactionRouter);
    app.get('/signIn', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        log('signInRedirect');
        try {
            if (req.session === undefined) {
                throw new Error('session is undefined');
            }
            const authModel = new auth2_model_1.Auth2Model(req.session.auth);
            if (req.query.state !== undefined &&
                req.query.state !== authModel.state) {
                throw new Error(`state not matched ${req.query.state} !== ${authModel.state}`);
            }
            const auth = authModel.create(req);
            const credentials = yield auth.getToken(req.query.code, authModel.codeVerifier);
            // log('credentials published', credentials);
            authModel.credentials = credentials;
            authModel.save(req.session);
            auth.setCredentials(credentials);
            res.redirect(`/#/auth/signin`);
        }
        catch (error) {
            log('signInRedirect error', error);
            next(error);
        }
    }));
    app.get('/signOut', (req, res, next) => {
        log('signOutRedirect');
        if (req.session === undefined) {
            next();
            return;
        }
        delete req.session.auth;
        res.redirect(`/#/auth/signout`);
    });
    app.get(['/projects/:projectId'], (req, res) => {
        res.redirect(`/?${path2Query(req)}`);
    });
    app.get('*', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        log('root', req.query);
        if (req.session === undefined) {
            next();
            return;
        }
        res.sendFile(path.resolve(`${__dirname}/../../../client/index.html`), {
            lastModified: false,
            etag: false,
        });
    }));
    app.all('*', (req, res, _next) => {
        res.status(http_status_1.NOT_FOUND);
        if (req.xhr || req.header('Sec-Fetch-Mode') === 'cors') {
            res.json('NOT FOUND');
            return;
        }
    });
};
/**
 * パスパラメータをクエリへ変換
 */
function path2Query(req) {
    let result = `projectId=${req.params.projectId}`;
    const query = req.url.split('?')[1];
    if (query !== undefined) {
        result += `&${query}`;
    }
    return result;
}
exports.path2Query = path2Query;
