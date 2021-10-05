import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BaseComponent } from './components/pages/base/base.component';
import { AlertModalComponent } from './components/parts/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './components/parts/confirm-modal/confirm-modal.component';
import { ContentsComponent } from './components/parts/contents/contents.component';
import { FooterComponent } from './components/parts/footer/footer.component';
import { CheckboxComponent } from './components/parts/form/checkbox/checkbox.component';
import { HeaderMenuComponent } from './components/parts/header-menu/header-menu.component';
import { HeaderComponent } from './components/parts/header/header.component';
import { LoadingComponent } from './components/parts/loading/loading.component';
import { NavigationComponent } from './components/parts/navigation/navigation.component';
import { QRCodeImageComponent } from './components/parts/qrcode/image/image.component';
import { QRCodeReaderModalComponent } from './components/parts/qrcode/reader-modal/reader-modal.component';
import { QRCodeViewerModalComponent } from './components/parts/qrcode/viewer-modal/viewer-modal.component';
import { ChangeLanguagePipe } from './pipes/change-language.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { LibphonenumberFormatPipe } from './pipes/libphonenumber-format.pipe';

const components = [
    BaseComponent,
    ContentsComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    LoadingComponent,
    CheckboxComponent,
    QRCodeImageComponent,
    NavigationComponent,
];

const entryComponents = [
    AlertModalComponent,
    ConfirmModalComponent,
    QRCodeReaderModalComponent,
    QRCodeViewerModalComponent,
];

@NgModule({
    declarations: [
        ...components,
        ...entryComponents,
        LibphonenumberFormatPipe,
        ChangeLanguagePipe,
        FormatDatePipe,
    ],
    entryComponents,
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        ModalModule,
        BsDatepickerModule,
        PaginationModule,
    ],
    exports: [
        ...components,
        ...entryComponents,
        LibphonenumberFormatPipe,
        ChangeLanguagePipe,
        FormatDatePipe,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        ModalModule,
        BsDatepickerModule,
        PaginationModule,
    ],
})
export class SharedModule {}
