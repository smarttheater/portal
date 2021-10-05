import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { factory } from '@cinerino/sdk';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

type CompoundPriceSpecification =
    factory.chevre.priceSpecificationType.CompoundPriceSpecification;

@Component({
    selector: 'app-item-reservation',
    templateUrl: './item-reservation.component.html',
    styleUrls: ['./item-reservation.component.scss'],
})
export class ItemReservationComponent implements OnInit {
    @Input()
    public reservation: factory.ownershipInfo.IOwnershipInfo<factory.ownershipInfo.IReservationWithDetail>;
    public price?: number;
    public priceComponents?: factory.priceSpecification.IPriceSpecification<CompoundPriceSpecification>[];
    public modalRef?: BsModalRef;
    public moment = moment;

    constructor(private modalService: BsModalService) {}

    public ngOnInit() {
        if (typeof this.reservation.typeOfGood.price === 'number') {
            this.price = this.reservation.typeOfGood.price;
            return;
        }
        this.priceComponents =
            this.reservation.typeOfGood.price?.priceComponent;
    }

    public openDetailModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, {
            class: 'modal-dialog-centered',
        });
    }
}
