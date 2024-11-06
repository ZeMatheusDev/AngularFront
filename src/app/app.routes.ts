import { Routes } from '@angular/router';
import { app } from '../../server';
import path from 'path';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { SocioComponent } from './socio/socio.component';
import { ListagemSocioComponent } from './listagem-socio/listagem-socio.component';
import { ListagemEmpresaComponent } from './listagem-empresa/listagem-empresa.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { authNotLogginGuard } from './auth-not-loggin.guard';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [authGuard] },
    { path: 'cadastro/empresa', component:  EmpresaComponent, canActivate: [authNotLogginGuard]},
    { path: 'cadastro/socio', component:  SocioComponent, canActivate: [authNotLogginGuard]},
    { path: 'listagem/socio', component:  ListagemSocioComponent, canActivate: [authNotLogginGuard]},
    { path: 'listagem/empresa', component:  ListagemEmpresaComponent, canActivate: [authNotLogginGuard]},
];
