import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateCommentResponse } from 'src/app/models/comments/create-comment-response.model';
import { CommentService } from 'src/app/services/social/comment.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {
  commentForm = new FormGroup({
    text: new FormControl('', Validators.required)
  });

  @Output() commentEvent = new EventEmitter<CreateCommentResponse>();
  @Input() postId!: string;

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
  }

  get textFormControl(): FormControl {
    return <FormControl>this.commentForm.get('text');
  }

  comment() {
    let body = this.commentForm.value;
    body.replyToPostId = this.postId;

    this.commentService.comment(body).subscribe(data => {
      this.commentEvent.emit(data);
      this.textFormControl.setValue('');
    });
  }

}
