import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SigninComponent } from './components/signin/signin.component';
import { UnsignedInGuardService } from './services/authen/unsigned-in-guard.service';

const routes: Routes = [
  { path: 'feed', component: FeedComponent, canActivate: [UnsignedInGuardService] },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SigninComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
