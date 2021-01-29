import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuardService } from './services/authen/auth-guard.service';

const routes: Routes = [
  { path: 'feed', component: FeedComponent, canActivate: [AuthGuardService] },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SigninComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
