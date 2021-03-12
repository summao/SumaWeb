import { Component, Input, OnInit } from '@angular/core';
import { CreateCommentResponse } from 'src/app/models/comments/create-comment-response.model';
import { Comment } from 'src/app/models/comments/comment.model';
import { CommentService } from 'src/app/services/social/comment.service';
import { Feed } from 'src/app/models/feeds/feed.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  comments: Comment[] = [];
  isShowAddComment = false;
  @Input() feed!: Feed;

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
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

  showAddCommentPanel() {
    this.isShowAddComment = true;
  }

  addPrivacyLevelClass(level: string): string {
    if (level === 'friend') {
      return 'bi-people';
    }

    if (level === 'public') {
      return 'bi-globe';
    }

    return '';
  }

  // events
  onClickComment(feedId: string) {
    if (this.comments.length <= 0) {
      this.getComments(feedId);
      this.showAddCommentPanel();
    }
  }

}
