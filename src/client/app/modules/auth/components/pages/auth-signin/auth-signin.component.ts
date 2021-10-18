import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Functions } from '../../../../..';
import { getEnvironment } from '../../../../../../environments/environment';
import { ActionService, UtilService } from '../../../../../services';
import * as reducers from '../../../../../store/reducers';

@Component({
    selector: 'app-auth-signin',
    templateUrl: './auth-signin.component.html',
    styleUrls: ['./auth-signin.component.scss'],
})
export class AuthSigninComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public environment = getEnvironment();

    constructor(
        private store: Store<reducers.IState>,
        private utilService: UtilService,
        private actionService: ActionService,
        private router: Router
    ) {}

    public async ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.utilService.loadStart({ process: 'load' });
        this.actionService.user.initialize({ login: true });
        const url = Functions.Util.getAuthRedirectUrl();
        Functions.Util.removeAuthRedirectUrl();
        if (url === undefined) {
            this.router.navigate([this.environment.BASE_URL]);
            return;
        }
        location.href = url;
    }
}
