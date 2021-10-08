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
    selector: 'app-paymentcard',
    templateUrl: './paymentcard.component.html',
    styleUrls: ['./paymentcard.component.scss'],
})
export class PaymentcardComponent implements OnInit {
    public error: Observable<string | null>;
    public isLoading: Observable<boolean>;
    public environment = getEnvironment();
    public paymentcards?: factory.ownershipInfo.IOwnershipInfo<factory.permit.IPermit>[];
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
            const now = moment(date).toDate();
            this.paymentcards = (
                await this.actionService.ownerShipInfo.searchMyPaymentCards({
                    ownedFrom: now,
                    ownedThrough: now,
                })
            ).filter(
                (p) =>
                    p.typeOfGood.paymentAccount?.status ===
                    factory.chevre.accountStatusType.Opened
            );
        } catch (error) {
            this.utilService.openAlert({
                title: this.translateService.instant('common.error'),
                body: this.translateService.instant(
                    'paymentcard.alert.searchMyMemberships'
                ),
                error:
                    JSON.stringify(error) === '{}'
                        ? error
                        : JSON.stringify(error),
            });
        }
    }
}
