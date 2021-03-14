import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/posts/post.model';
import { PostService } from 'src/app/services/social/post.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.postService.get().subscribe(
      result => {
        this.posts = result;
      }
    );
  }

}
