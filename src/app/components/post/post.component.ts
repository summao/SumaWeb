import { Component, Input, OnInit } from '@angular/core';
import { CreateCommentResponse } from 'src/app/models/comments/create-comment-response.model';
import { Comment } from 'src/app/models/comments/comment.model';
import { CommentService } from 'src/app/services/social/comment.service';
import { Post } from 'src/app/models/posts/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  comments: Comment[] = [];
  isShowAddComment = false;
  @Input() post!: Post;

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

  getComments(postId: string): void {
    this.commentService.getMany(postId).subscribe(comments => {
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
  onClickComment(postId: string) {
    if (this.comments.length <= 0) {
      this.getComments(postId);
      this.showAddCommentPanel();
    }
  }

}
