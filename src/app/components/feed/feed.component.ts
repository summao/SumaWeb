import { Component, OnInit } from '@angular/core';
import { CreateCommentResponse } from 'src/app/models/comments/create-comment-response.model';
import { Feed } from 'src/app/models/feeds/feed.model';
import { FeedService } from 'src/app/services/social/feed.service';
import { Comment } from 'src/app/models/comments/comment.model';
import { CommentService } from 'src/app/services/social/comment.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feeds: Feed[] = [];
  comments: Comment[] = [];

  constructor(
    private feedService: FeedService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.feedService.get().subscribe(
      result => {
        this.feeds = result;
      }
    );
  }

  addComment(comment: CreateCommentResponse): void {
    this.comments.unshift({
      id: comment.commentId,
      text: comment.text,
      created: comment.created
    });
  }

  getComments(feedId: string): void {
    this.commentService.getMany(feedId).subscribe(comments => {
      this.comments = comments;
    });
  }

}
