"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ルーティングAPI
 */
const cinerino = require("@cinerino/api-nodejs-client");
const debug = require("debug");
const express = require("express");
const base_controller_1 = require("../controllers/base/base.controller");
const auth2_model_1 = require("../models/auth2/auth2.model");
const log = debug('pos:download');
const router = express.Router();
router.get('/order', (req, res) => __awaiter(this, void 0, void 0, function* () {
    log('order', req.query);
    try {
        const params = JSON.parse(req.query.params);
        const orderService = new cinerino.service.Order({
            endpoint: process.env.API_ENDPOINT,
            auth: new auth2_model_1.Auth2Model(req.session.auth).create()
        });
        const stream = yield orderService.download(params);
        const filename = 'OrderReport';
        if (params.format === cinerino.factory.encodingFormat.Application.json) {
            res.setHeader('Content-disposition', `attachment; filename*=UTF-8\'\'${encodeURIComponent(`${filename}.json`)}`);
            res.setHeader('Content-Type', `${cinerino.factory.encodingFormat.Application.json}; charset=UTF-8`);
        }
        else if (params.format === cinerino.factory.encodingFormat.Text.csv) {
            res.setHeader('Content-disposition', `attachment; filename*=UTF-8\'\'${encodeURIComponent(`${filename}.csv`)}`);
            res.setHeader('Content-Type', `${cinerino.factory.encodingFormat.Text.csv}; charset=UTF-8`);
        }
        stream.pipe(res);
    }
    catch (error) {
        base_controller_1.errorProsess(res, error);
    }
}));
exports.default = router;
