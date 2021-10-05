import { Component, OnInit } from '@angular/core';
import { ActionService } from '../../../../../services';
@Component({
    selector: 'app-auth-signout',
    templateUrl: './auth-signout.component.html',
    styleUrls: ['./auth-signout.component.scss'],
})
export class AuthSignoutComponent implements OnInit {
    constructor(private actionService: ActionService) {}

    public ngOnInit() {
        this.actionService.user.initialize({ login: false });
    }

    public selectProject() {}
}
