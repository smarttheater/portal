import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { factory } from '@cinerino/sdk';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-item-paymentcard',
    templateUrl: './item-paymentcard.component.html',
    styleUrls: ['./item-paymentcard.component.scss'],
})
export class ItemPaymentcardComponent implements OnInit {
    @Input()
    public paymentcard: factory.ownershipInfo.IOwnershipInfo<factory.permit.IPermit>;
    public modalRef?: BsModalRef;
    public moment = moment;

    constructor(private modalService: BsModalService) {}

    public ngOnInit() {}

    public openDetailModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, {
            class: 'modal-dialog-centered',
        });
    }
}
