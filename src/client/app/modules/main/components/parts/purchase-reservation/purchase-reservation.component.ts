import { Component, OnInit } from '@angular/core';
import { Functions } from '../../../../..';

@Component({
    selector: 'app-purchase-reservation',
    templateUrl: './purchase-reservation.component.html',
    styleUrls: ['./purchase-reservation.component.scss'],
})
export class PurchaseReservationComponent implements OnInit {
    constructor() {}

    public ngOnInit() {}

    public onClick() {
        const { projectId, transactionUrl } = Functions.Util.getProject();
        const url = `${transactionUrl}/projects/${projectId}?login=true`;
        open(url, '_blank');
    }
}
