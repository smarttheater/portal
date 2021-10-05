import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-alert-modal',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent implements OnInit {
    @Input() public title: string;
    @Input() public body: string;
    @Input() public error?: string;

    constructor(public modal: BsModalRef, private elementRef: ElementRef) {}

    public ngOnInit() {
        const element: HTMLElement =
            this.elementRef.nativeElement.querySelector('.scroll-vertical');
        setTimeout(() => {
            element.scrollTop = 0;
        }, 0);
    }
}
