import { Component, Input, OnInit } from '@angular/core';
import { CreateCommentResponse } from 'src/app/models/comments/create-comment-response.model';
import { Comment } from 'src/app/models/comments/comment.model';
import { CommentService } from 'src/app/services/social/comment.service';
import { Post } from 'src/app/models/posts/post.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  comments: Comment[] = [];
  isShowAddComment = false;
  @Input() post!: Post;
  imageUrl = environment.sumaSocialUrl;

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
    // tslint:disable-next-line: deprecation
    this.commentService.getMany(postId).subscribe(comments => {
      this.comments = comments;
    });
  }

  showAddCommentPanel(): void {
    this.isShowAddComment = true;
  }

  addPrivacyLevelClass(level: string): string {
    if (level === 'friends') {
      return 'bi-people';
    }

    if (level === 'public') {
      return 'bi-globe';
    }

    return '';
  }

  // events
  onClickComment(postId: string): void {
    if (this.comments.length <= 0) {
      this.getComments(postId);
      this.showAddCommentPanel();
    }
  }

}
