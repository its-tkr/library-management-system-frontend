import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbookComponent } from './components/addbook/addbook.component';
import { EditbookComponent } from './components/editbook/editbook.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MybookComponent } from './components/mybook/mybook.component';
import { RentbookComponent } from './components/rentbook/rentbook.component';
import { RentlistComponent } from './components/rentlist/rentlist.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'rent-book/:id', component: RentbookComponent, canActivate: [AuthGuard], },
  { path: 'my-books', component: MybookComponent, canActivate: [AuthGuard] },
  { path: 'edit-book/:id', component: EditbookComponent, canActivate: [AuthGuard], },
  { path: 'add-book', component: AddbookComponent, canActivate: [AuthGuard] },
  { path: 'rent-list', component: RentlistComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
