import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FeedService } from 'src/app/services/social/feed.service';

@Component({
  selector: 'app-create-feed',
  templateUrl: './create-feed.component.html',
  styleUrls: ['./create-feed.component.css']
})
export class CreateFeedComponent implements OnInit {
  creatForm = new FormGroup({
    privacy: new FormControl(''),
    text: new FormControl('')
  });

  constructor(
    private feedService: FeedService
  ) { }

  ngOnInit(): void {
  }

  post(): void {
    this.feedService.post(this.creatForm.value).subscribe();
  }

}
