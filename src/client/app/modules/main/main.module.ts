import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MembershipComponent } from './components/pages/membership/membership.component';
import { PaymentcardComponent } from './components/pages/paymentcard/paymentcard.component';
import { ReservationComponent } from './components/pages/reservation/reservation.component';
import { ItemEventComponent } from './components/parts/item-event/item-event.component';
import { ItemMembershipComponent } from './components/parts/item-membership/item-membership.component';
import { ItemPaymentcardComponent } from './components/parts/item-paymentcard/item-paymentcard.component';
import { ItemReservationComponent } from './components/parts/item-reservation/item-reservation.component';
import { PurchaseMembershipComponent } from './components/parts/purchase-membership/purchase-membership.component';
import { PurchasePaymentcardComponent } from './components/parts/purchase-paymentcard/purchase-paymentcard.component';
import { PurchaseReservationComponent } from './components/parts/purchase-reservation/purchase-reservation.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
    declarations: [
        ReservationComponent,
        MembershipComponent,
        PaymentcardComponent,
        PurchaseReservationComponent,
        PurchaseMembershipComponent,
        PurchasePaymentcardComponent,
        ItemEventComponent,
        ItemReservationComponent,
        ItemMembershipComponent,
        ItemPaymentcardComponent,
    ],
    imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
