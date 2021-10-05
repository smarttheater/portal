import { Injectable } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as reducers from '../../store/reducers';
import { CinerinoService } from '../cinerino.service';
import { UtilService } from '../util.service';

@Injectable({
    providedIn: 'root',
})
export class ActionOwnerShipInfoService {
    public error: Observable<string | null>;
    constructor(
        private store: Store<reducers.IState>,
        private cinerinoService: CinerinoService,
        private utilService: UtilService
    ) {
        this.error = this.store.pipe(select(reducers.getError));
    }

    /**
     *  予約検索
     */
    public async searchMyReservations(params: {
        limit?: number;
        page?: number;
        sort?: factory.chevre.ownershipInfo.ISortOrder;
        ownedFrom?: Date;
        ownedThrough?: Date;
    }) {
        try {
            this.utilService.loadStart({
                process: 'action.OwnerShipInfo.searchMyReservations',
            });
            await this.cinerinoService.getServices();
            const ownershipInfoService = this.cinerinoService.ownershipInfo;
            const { data } = await ownershipInfoService.searchMyReservations(
                params
            );
            this.utilService.loadEnd();
            return data;
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }

    /**
     *  メンバーシップ検索
     */
    public async searchMyMemberships(params: {
        limit?: number;
        page?: number;
        sort?: factory.chevre.ownershipInfo.ISortOrder;
        ownedFrom?: Date;
        ownedThrough?: Date;
    }) {
        try {
            this.utilService.loadStart({
                process: 'action.OwnerShipInfo.searchMyMemberships',
            });
            await this.cinerinoService.getServices();
            const ownershipInfoService = this.cinerinoService.ownershipInfo;
            const { data } = await ownershipInfoService.searchMyMemberships(
                params
            );
            this.utilService.loadEnd();
            return data;
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }

    /**
     *  ペイメントカード検索
     */
    public async searchMyPaymentCards(params: {
        limit?: number;
        page?: number;
        sort?: factory.chevre.ownershipInfo.ISortOrder;
        ownedFrom?: Date;
        ownedThrough?: Date;
    }) {
        try {
            this.utilService.loadStart({
                process: 'action.OwnerShipInfo.searchMyPaymentCards',
            });
            await this.cinerinoService.getServices();
            const ownershipInfoService = this.cinerinoService.ownershipInfo;
            const { data } = await ownershipInfoService.searchMyPaymentCards(
                params
            );
            this.utilService.loadEnd();
            return data;
        } catch (error) {
            this.utilService.setError(error);
            this.utilService.loadEnd();
            throw error;
        }
    }
}
