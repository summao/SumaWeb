import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedService } from 'src/app/services/social/feed.service';

@Component({
  selector: 'app-create-feed',
  templateUrl: './create-feed.component.html',
  styleUrls: ['./create-feed.component.css']
})
export class CreateFeedComponent implements OnInit {
  creatForm = new FormGroup({
    privacyLevel: new FormControl('friend'),
    text: new FormControl('', Validators.required)
  });

  posting = false;

  constructor(
    private feedService: FeedService
  ) { }

  ngOnInit(): void {
  }

  post(): void {
    this.posting = true;
    this.feedService.post(this.creatForm.value).subscribe(data => {
      this.creatForm.get('text')?.setValue('');
    })
      .add(() => {
        this.posting = false;
      });
  }

}
