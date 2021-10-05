/**
 * ルーティング
 */
import * as debug from 'debug';
import * as express from 'express';
import { NOT_FOUND } from 'http-status';
import * as path from 'path';
import { Auth2Model } from '../models/auth2/auth2.model';
import { authorizeRouter } from './api/authorize';
import { utilRouter } from './api/util';
const log = debug('application: router');

export default (app: express.Application) => {
    app.use((_req, res, next) => {
        res.locals.APP_ENV = process.env.APP_ENV;
        next();
    });
    app.use((req, res, next) => {
        if (
            /\.(css|js|svg|jpg|png|gif|ico|json|html|txt|woff|woff2)/.test(
                req.path
            )
        ) {
            res.status(404);
            res.end();
            return;
        }
        next();
    });

    app.use('/api/authorize', authorizeRouter);
    app.use('/api', utilRouter);

    app.use((req, res, next) => {
        if (req.xhr || req.header('Sec-Fetch-Mode') === 'cors') {
            res.status(NOT_FOUND);
            res.send('NOT FOUND');
            return;
        }
        next();
    });

    app.get('/signIn', async (req, res, next) => {
        log('signInRedirect');
        try {
            if (req.session === undefined) {
                throw new Error('session is undefined');
            }
            const authModel = new Auth2Model(req.session.auth);
            if (
                req.query.state !== undefined &&
                req.query.state !== authModel.state
            ) {
                throw new Error(
                    `state not matched ${req.query.state} !== ${authModel.state}`
                );
            }
            const auth = authModel.create(req);
            const credentials = await auth.getToken(
                req.query.code,
                <string>authModel.codeVerifier
            );
            // log('credentials published', credentials);
            authModel.credentials = credentials;
            authModel.save(req.session);
            auth.setCredentials(credentials);
            res.redirect(`/#/auth/signin`);
        } catch (error) {
            log('signInRedirect error', error);
            next(error);
        }
    });

    app.get('/signOut', (req, res, next) => {
        log('signOutRedirect');
        if (req.session === undefined) {
            next();
            return;
        }
        delete (<Express.Session>req.session).auth;
        res.redirect(`/#/auth/signout`);
    });

    app.get(['/projects/:projectId'], (req, res) => {
        res.redirect(`/?${path2Query(req)}`);
    });

    app.get('*', async (req, res, next) => {
        log('root', req.query);
        if (req.session === undefined) {
            next();
            return;
        }
        res.sendFile(path.resolve(`${__dirname}/../../../client/index.html`), {
            lastModified: false,
            etag: false,
        });
    });

    app.all('*', (req, res, _next) => {
        res.status(NOT_FOUND);
        if (req.xhr || req.header('Sec-Fetch-Mode') === 'cors') {
            res.json('NOT FOUND');
            return;
        }
    });
};

/**
 * パスパラメータをクエリへ変換
 */
function path2Query(req: express.Request) {
    let result = `projectId=${req.params.projectId}`;
    const query = req.url.split('?')[1];
    if (query !== undefined) {
        result += `&${query}`;
    }
    return result;
}
