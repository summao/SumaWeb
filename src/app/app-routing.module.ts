import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SigninComponent } from './components/signin/signin.component';
import { UnsignedInGuardService } from './services/authen/unsigned-in-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'post', pathMatch: 'full' },
  {
    path: 'post', component: PostListComponent
    // , canActivate: [UnsignedInGuardService] 
  },
  { path: 'signup', component: SignUpComponent, canActivate: [UnsignedInGuardService] },
  { path: 'signin', component: SigninComponent, canActivate: [UnsignedInGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
