import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/posts/post.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(100%)'
        }),
        animate('.3s ease-out', style({
          opacity: 1,
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
  @Input() posts!: Post[];

  constructor() { }

  ngOnInit(): void {

  }

}
