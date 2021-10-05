import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { factory } from '@cinerino/sdk';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-item-membership',
    templateUrl: './item-membership.component.html',
    styleUrls: ['./item-membership.component.scss'],
})
export class ItemMembershipComponent implements OnInit {
    @Input()
    public membership: factory.ownershipInfo.IOwnershipInfo<factory.permit.IPermit>;
    @Input() public now: Date;
    public modalRef?: BsModalRef;
    public moment = moment;
    public isValid: boolean;

    constructor(private modalService: BsModalService) {}

    public ngOnInit() {
        this.isValid = moment(this.now).isBetween(
            moment(this.membership.typeOfGood.validFrom),
            moment(this.membership.typeOfGood.validUntil)
        );
        console.log(this.membership);
    }

    public openDetailModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, {
            class: 'modal-dialog-centered',
        });
    }
}
