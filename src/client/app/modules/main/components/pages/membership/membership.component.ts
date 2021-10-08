import { Component, OnInit } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../environments/environment';
import { ActionService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-membership',
    templateUrl: './membership.component.html',
    styleUrls: ['./membership.component.scss'],
})
export class MembershipComponent implements OnInit {
    public error: Observable<string | null>;
    public isLoading: Observable<boolean>;
    public environment = getEnvironment();
    public memberships?: factory.ownershipInfo.IOwnershipInfo<factory.permit.IPermit>[];
    public now: Date;
    public products: (
        | factory.product.IProduct
        | factory.service.paymentService.IService
    )[];

    constructor(
        private store: Store<reducers.IState>,
        private utilService: UtilService,
        private actionService: ActionService,
        private translateService: TranslateService
    ) {}

    /**
     * 初期化
     */
    public async ngOnInit() {
        this.error = this.store.pipe(select(reducers.getError));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        try {
            this.products = await this.actionService.product.search({
                typeOf: {
                    $in: [
                        factory.chevre.product.ProductType.MembershipService,
                        factory.product.ProductType.PaymentCard,
                    ],
                },
            });
            const { date } = await this.utilService.getServerTime(true);
            this.now = moment(date).toDate();
            this.memberships = (
                await this.actionService.ownerShipInfo.searchMyMemberships({
                    ownedFrom: this.now,
                    ownedThrough: this.now,
                })
            ).filter((m) => {
                return (
                    m.typeOfGood.validFrom !== undefined &&
                    m.typeOfGood.validUntil !== undefined &&
                    moment(this.now).isBetween(
                        moment(m.typeOfGood.validFrom),
                        moment(m.typeOfGood.validUntil)
                    )
                );
            });
        } catch (error) {
            this.utilService.openAlert({
                title: this.translateService.instant('common.error'),
                body: this.translateService.instant(
                    'membership.alert.searchMyMemberships'
                ),
                error:
                    JSON.stringify(error) === '{}'
                        ? error
                        : JSON.stringify(error),
            });
        }
    }
}
