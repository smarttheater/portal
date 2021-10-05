import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ErrorComponent } from './components/pages/error/error.component';
import { MaintenanceComponent } from './components/pages/maintenance/maintenance.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { ErrorRoutingModule } from './error-routing.module';

@NgModule({
    declarations: [ErrorComponent, MaintenanceComponent, NotfoundComponent],
    imports: [CommonModule, ErrorRoutingModule, SharedModule],
})
export class ErrorModule {}
