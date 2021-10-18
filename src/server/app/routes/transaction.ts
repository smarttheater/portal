/**
 * 認証API
 */
import * as debug from 'debug';
import * as express from 'express';
import * as queryString from 'query-string';
const router = express.Router();
const log = debug('application: /transaction');

/**
 * イベント取引
 */
router.get('/projects/:projectId/transaction/event', async (req, res) => {
    log('transaction/event', req.params, req.query);
    const transactionUrl = process.env.TRANSACTION_URL;
    const { projectId } = req.params;
    const { id, passportToken, login, theaterBranchCode, scheduleDate } =
        req.query;
    const url =
        id === undefined
            ? `${transactionUrl}/projects/${projectId}`
            : passportToken === undefined
            ? `${transactionUrl}/projects/${projectId}/purchase/transaction/${id}`
            : `${transactionUrl}/projects/${projectId}/purchase/transaction/${id}/${passportToken}`;
    const query = queryString.stringify({
        login,
        theaterBranchCode,
        scheduleDate,
    });
    const redirectUrl = `${url}${query.length > 0 ? '?' + query : ''}`;
    log('redirectUrl', redirectUrl);
    if (login === 'true') {
        res.redirect(
            `/projects/${projectId}?redirectUrl=${encodeURIComponent(
                redirectUrl
            )}`
        );
        return;
    }
    res.redirect(redirectUrl);
});

/**
 * イベント取引照会
 */
router.get('/projects/:projectId/transaction/inquiry', async (req, res) => {
    log('transaction/inquiry', req.params, req.query);
    const transactionUrl = process.env.TRANSACTION_URL;
    const { projectId } = req.params;
    const { login } = req.query;
    const url = `${transactionUrl}/projects/${projectId}/inquiry`;
    const query = queryString.stringify({
        login,
    });
    log('redirect', `${url}${query.length > 0 ? '?' + query : ''}`);
    res.redirect(`${url}${query.length > 0 ? '?' + query : ''}`);
});

export const transactionRouter = router;
