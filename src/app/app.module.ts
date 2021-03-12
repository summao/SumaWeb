import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './components/feed/feed.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SigninComponent } from './components/signin/signin.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { DateTimezonePipe } from './pipes/date-timezone.pipe';
import { CreateFeedComponent } from './components/create-feed/create-feed.component';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { FeedListComponent } from './components/feed-list/feed-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    SignUpComponent,
    SigninComponent,
    DateTimezonePipe,
    CreateFeedComponent,
    CreateCommentComponent,
    CommentListComponent,
    FeedListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
