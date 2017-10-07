import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './landing/login/login.component';
import { RegisterComponent } from './landing/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main/login' },
  { path: 'details/:id', component: EventDetailComponent },
  { path: 'main', component: LandingComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ]},
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', pathMatch: 'full', component: EventsComponent },
    { path: 'create', component: CreateComponent },
    { path: 'events', component: EventsComponent }] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
