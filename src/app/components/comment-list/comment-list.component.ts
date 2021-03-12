import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comments/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() comments!: Comment[];

  constructor() { }

  ngOnInit(): void {
  }

}
