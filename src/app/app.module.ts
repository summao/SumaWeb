import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SigninComponent } from './components/signin/signin.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { DateTimezonePipe } from './pipes/date-timezone.pipe';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { MyHouseComponent } from './components/my-house/my-house.component';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    SignUpComponent,
    SigninComponent,
    DateTimezonePipe,
    CreatePostComponent,
    CreateCommentComponent,
    CommentListComponent,
    PostListComponent,
    MyHouseComponent,
    NewsFeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
