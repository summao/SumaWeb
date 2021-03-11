import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateCommentResponse } from 'src/app/models/comments/CreateCommentResponse.model';
import { CommentService } from 'src/app/services/social/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  commentForm = new FormGroup({
    text: new FormControl('', Validators.required)
  });

  @Output() commentEvent = new EventEmitter<CreateCommentResponse>();
  @Input() feedId!: string;

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
    body.replyToFeedId = this.feedId;

    this.commentService.comment(body).subscribe(data => {
      this.commentEvent.emit(data);
      this.textFormControl.setValue('');
    });
  }

}
