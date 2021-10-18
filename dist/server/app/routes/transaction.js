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
exports.transactionRouter = void 0;
/**
 * 認証API
 */
const debug = require("debug");
const express = require("express");
const queryString = require("query-string");
const router = express.Router();
const log = debug('application: /transaction');
/**
 * イベント取引
 */
router.get('/projects/:projectId/transaction/event', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    log('transaction/event', req.params, req.query);
    const transactionUrl = process.env.TRANSACTION_URL;
    const { projectId } = req.params;
    const { id, passportToken, login, theaterBranchCode, scheduleDate } = req.query;
    const url = id === undefined
        ? `${transactionUrl}/projects/${projectId}`
        : passportToken === undefined
            ? `${transactionUrl}/projects/${projectId}/purchase/transaction/${id}`
            : `${transactionUrl}/projects/${projectId}/purchase/transaction/${id}/${passportToken}`;
    const query = queryString.stringify({
        login,
        theaterBranchCode,
        scheduleDate,
    });
    log('redirect', `${url}${query.length > 0 ? '?' + query : ''}`);
    res.redirect(`${url}${query.length > 0 ? '?' + query : ''}`);
}));
/**
 * イベント取引照会
 */
router.get('/projects/:projectId/transaction/inquiry', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
exports.transactionRouter = router;
