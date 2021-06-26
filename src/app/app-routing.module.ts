import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyHouseComponent } from './components/my-house/my-house.component';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SigninComponent } from './components/signin/signin.component';
import { WelcomeComponent } from './page-components/welcome/welcome.component';
import { UnsignedInGuardService } from './services/authen/unsigned-in-guard.service';

const routes: Routes = [
  {
    path: 'news-feed', component: NewsFeedComponent, canActivate: [UnsignedInGuardService] 
  },
  // { path: 'signup', component: SignUpComponent, canActivate: [UnsignedInGuardService] },
  // { path: 'signin', component: SigninComponent, canActivate: [UnsignedInGuardService] },
  { path: 'my-house', component: MyHouseComponent },
  { path: '', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
