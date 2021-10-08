/**
 * PaymentCardGuardService
 */
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { factory } from '@cinerino/sdk';
import * as moment from 'moment';
import { Functions } from '..';
import { ActionService, UtilService } from '../services';

@Injectable({
    providedIn: 'root',
})
export class PaymentCardGuardService implements CanActivate {
    constructor(
        private actionService: ActionService,
        private utilService: UtilService
    ) {}

    /**
     * 認証
     * @method canActivate
     * @returns {Promise<boolean>}
     */
    public async canActivate(): Promise<boolean> {
        try {
            const { date } = await this.utilService.getServerTime(true);
            const now = moment(date).toDate();
            const products = await this.actionService.product.search({
                typeOf: { $eq: factory.product.ProductType.PaymentCard },
                offers: {
                    $elemMatch: {
                        availabilityStarts: {
                            $lte: now,
                            // $gte: now,
                        },
                        availabilityEnds: {
                            // $lte: now,
                            $gte: now,
                        },
                    },
                },
            });
            if (products.length === 0) {
                return true;
            }
            const paymentcards = (
                await this.actionService.ownerShipInfo.searchMyPaymentCards({
                    ownedFrom: now,
                    ownedThrough: now,
                })
            ).filter(
                (p) =>
                    p.typeOfGood.paymentAccount?.status ===
                    factory.chevre.accountStatusType.Opened
            );
            if (paymentcards.length === 0) {
                const { transactionUrl, projectId } =
                    Functions.Util.getProject();
                const redirectTo = `${location.origin}/projects/${projectId}`;
                const url = `${transactionUrl}/projects/${projectId}/product/automation/paymentcard?login=true&redirectTo=${redirectTo}`;
                location.href = url;
                return false;
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
