import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Post } from 'src/app/models/posts/post.model';
import { AccountService } from 'src/app/services/authen/account.service';
import { PostService } from 'src/app/services/social/post.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  posts: Post[] = [];
  expiredDate : any;
  now: any;
  time: any;
  constructor(
    private postService: PostService,
    private accountService: AccountService,
    public jwtHelper: JwtHelperService,
  ) { }

  ngOnInit(): void {
    this.postService.getMany().subscribe(result => this.posts = result);

    const profile = this.accountService.getProfile();
    let i = 1;
    setInterval(()=> {
      const now = new Date();
      const countDownDate = this.jwtHelper.getTokenExpirationDate(profile?.accessToken) ?? now;
      this.expiredDate = countDownDate.toLocaleString();
      const distance = countDownDate.getTime() - now.getTime();
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor( (distance/1000) % 60 );
      this.time = hours + "h "+ minutes + "m " + seconds + "s ";
      this.now = now;
    }, 1000)
  }

  onPosted(post: Post): void {
    this.posts.unshift(post);
  }

}
