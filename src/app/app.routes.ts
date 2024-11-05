import { Routes } from '@angular/router';
import { app } from '../../server';
import path from 'path';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
];
