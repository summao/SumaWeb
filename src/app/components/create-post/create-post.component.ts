import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/social/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  creatForm = new FormGroup({
    privacyLevel: new FormControl('friend'),
    text: new FormControl('', Validators.required)
  });

  posting = false;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
  }

  post(): void {
    this.posting = true;
    this.postService.post(this.creatForm.value).subscribe(data => {
      this.creatForm.get('text')?.setValue('');
    })
      .add(() => {
        this.posting = false;
      });
  }

}
