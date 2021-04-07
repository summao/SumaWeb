import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/posts/post.model';
import { PostService } from 'src/app/services/social/post.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0,
          transform: 'translateX(100%)'
        }),
        animate('.3s ease-out', style({ opacity: 1,
          transform: 'translateX(0%)'
        })),
      ]),
      transition(':leave', [
        animate('1000ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.postService.getMany().subscribe(result => this.posts = result);
  }

  onPosted(post: Post): void {
    this.posts.unshift(post);
  }

}
