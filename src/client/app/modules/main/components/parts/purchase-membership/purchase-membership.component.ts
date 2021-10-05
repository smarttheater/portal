import { Component, OnInit } from '@angular/core';
import { Functions } from '../../../../..';

@Component({
    selector: 'app-purchase-membership',
    templateUrl: './purchase-membership.component.html',
    styleUrls: ['./purchase-membership.component.scss'],
})
export class PurchaseMembershipComponent implements OnInit {
    constructor() {}

    public ngOnInit() {}

    public onClick() {
        const { projectId, transactionUrl } = Functions.Util.getProject();
        const url = `${transactionUrl}/projects/${projectId}/product/membership?login=true`;
        open(url, '_blank');
    }
}
