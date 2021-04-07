import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/posts/post.model';
import { PostService } from 'src/app/services/social/post.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getMany().subscribe(result => this.posts = result);
  }

  onPosted(post: Post): void {
    this.posts.unshift(post);
  }

}
