import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { ErrorComponent } from './error/error.component';
import { AddEditContactComponent } from './contact/add-edit.contact/add-edit.contact.component';
import { CONTACT_PAGE_PATH } from './app.constants';

const routes: Routes = [
  { path: '', component: ContainerComponent },
  { path:  CONTACT_PAGE_PATH, component:  AddEditContactComponent},
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' } // Redirect to error page for any other unknown route, ling todo: needed?
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
