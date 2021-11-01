/**
 * ルーティング
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getEnvironment } from '../environments/environment';
import {
    AuthGuardService,
    PaymentCardGuardService,
    ProjectGuardService,
} from './canActivates';
import { ErrorModule } from './modules/error/error.module';

const appRoutes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/auth/auth.module')
                .then((m) => m.AuthModule)
                .catch(() => location.reload()),
    },
    {
        path: '',
        canActivate: [
            AuthGuardService,
            ProjectGuardService,
            PaymentCardGuardService,
        ],
        loadChildren: () =>
            import('./modules/main/main.module')
                .then((m) => m.MainModule)
                .catch(() => location.reload()),
    },
    {
        path: '',
        loadChildren: () => ErrorModule,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            useHash: true,
            enableTracing: !getEnvironment().production,
            relativeLinkResolution: 'legacy',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
