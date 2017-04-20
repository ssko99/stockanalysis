import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { ChartsComponent } from './charts/charts.component';
import {NotesComponent} from './notes/notes.component';
import { AuthGuard } from "app/auth.guard";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'charts/:id', component: ChartsComponent ,
        canActivate: [AuthGuard]},
      { path: 'notes', component: NotesComponent ,
        canActivate: [AuthGuard]},
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: WelcomeComponent }
    ])
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
