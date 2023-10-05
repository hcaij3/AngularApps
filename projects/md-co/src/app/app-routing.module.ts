import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { ErrorComponent } from './error/error.component';
import { AddEditContactComponent } from '@hpfb/sdk/ui';

const routes: Routes = [
  { path: '', component: ContainerComponent },
  { path:  'lingcontacts', component:  AddEditContactComponent},
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' } // Redirect to error page for any other unknown route, ling todo: needed?
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
