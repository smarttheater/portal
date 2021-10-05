import { Component, OnInit } from '@angular/core';
import { Functions } from '../../../../..';

@Component({
    selector: 'app-purchase-paymentcard',
    templateUrl: './purchase-paymentcard.component.html',
    styleUrls: ['./purchase-paymentcard.component.scss'],
})
export class PurchasePaymentcardComponent implements OnInit {
    constructor() {}

    public ngOnInit() {}

    public onClick() {
        const { projectId, transactionUrl } = Functions.Util.getProject();
        const url = `${transactionUrl}/projects/${projectId}/product/paymentcard?login=true`;
        open(url, '_blank');
    }
}
