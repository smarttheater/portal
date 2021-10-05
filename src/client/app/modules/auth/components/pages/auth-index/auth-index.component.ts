import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getEnvironment } from '../../../../../../environments/environment';
import { ActionService } from '../../../../../services';
import { CinerinoService } from '../../../../../services/cinerino.service';

@Component({
    selector: 'app-auth-index',
    templateUrl: './auth-index.component.html',
    styleUrls: ['./auth-index.component.scss'],
})
export class AuthIndexComponent implements OnInit {
    public environment = getEnvironment();

    constructor(
        private cinerino: CinerinoService,
        private router: Router,
        private actionService: ActionService
    ) {}

    public async ngOnInit() {
        try {
            await this.cinerino.getServices();
            this.actionService.user.initialize({ login: true });
            this.router.navigate([this.environment.BASE_URL]);
        } catch (error) {
            await this.cinerino.signIn();
        }
    }
}
