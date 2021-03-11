import { Component, OnInit } from '@angular/core';
import { CreateCommentResponse } from 'src/app/models/comments/CreateCommentResponse.model';
import { Feed } from 'src/app/models/feeds/feed.model';
import { FeedService } from 'src/app/services/social/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  feeds: Feed[] = [];
  comments: CreateCommentResponse[] = [];

  constructor(
    private feedService: FeedService
  ) { }

  ngOnInit(): void {
    this.feedService.get().subscribe(
      result => {
        this.feeds = result;
      }
    );
  }

  addComment(comment: CreateCommentResponse) {
    this.comments.unshift(comment);
  }

}
