import { Injectable } from '@angular/core';
import { ActionOwnerShipInfoService } from './action/ownerShipInfo.service';
import { ActionUserService } from './action/user.service';

@Injectable({
    providedIn: 'root',
})
export class ActionService {
    constructor(
        public user: ActionUserService,
        public ownerShipInfo: ActionOwnerShipInfoService
    ) {}
}
