import { Routes } from '@angular/router';
import { NeueKennzeichenFindenComponent } from './neue-kennzeichen-finden/neue-kennzeichen-finden.component';
import { BereitsGefundeneKennzeichenComponent } from './bereits-gefundene-kennzeichen/bereits-gefundene-kennzeichen.component';
import { LoginOrRegisterComponent } from './login-or-register/login-or-register.component';

export const routes: Routes & Array<{title: string, path: string}> = [
    {
        title: 'Finde neue Kennzeichen',
        path: 'neu',
        loadComponent: () => NeueKennzeichenFindenComponent
    },
    {
        title: 'Sieh die gefundenen Kennzeichen',
        path: 'alt',
        loadComponent: () => BereitsGefundeneKennzeichenComponent
    },
    {
        title: 'Benutzer Login',
        path: 'login',
        loadComponent: () => LoginOrRegisterComponent
    }
];
