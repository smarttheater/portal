import { Component, OnInit } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { getEnvironment } from '../../../../../../environments/environment';
import { ActionService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
    public error: Observable<string | null>;
    public isLoading: Observable<boolean>;
    public environment = getEnvironment();
    public reservations?: factory.ownershipInfo.IOwnershipInfo<factory.ownershipInfo.IReservationWithDetail>[];

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
            this.reservations =
                await this.actionService.ownerShipInfo.searchMyReservations({});
        } catch (error) {
            this.utilService.openAlert({
                title: this.translateService.instant('common.error'),
                body: this.translateService.instant(
                    'reservation.alert.searchMyReservations'
                ),
                error:
                    JSON.stringify(error) === '{}'
                        ? error
                        : JSON.stringify(error),
            });
        }
    }
}
