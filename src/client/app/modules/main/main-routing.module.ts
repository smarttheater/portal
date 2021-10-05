import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from '../shared/components/pages/base/base.component';
import { MembershipComponent } from './components/pages/membership/membership.component';
import { PaymentcardComponent } from './components/pages/paymentcard/paymentcard.component';
import { ReservationComponent } from './components/pages/reservation/reservation.component';

const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        children: [
            { path: 'reservation', component: ReservationComponent },
            { path: 'membership', component: MembershipComponent },
            { path: 'paymentcard', component: PaymentcardComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {}
