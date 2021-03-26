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
    privacyLevel: new FormControl('friends'),
    text: new FormControl('', Validators.required)
  });

  posting = false;
  uploadImageUrl!: string | ArrayBuffer | null;
  files!: any;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
  }

  onPostClicked(): void {
    this.posting = true;
    const formData = new FormData();
    formData.append('Image', this.files === undefined ? null : this.files[0]);
    const value = this.creatForm.value;
    formData.append('PrivacyLevel', value.privacyLevel);
    formData.append('Text', value.text);

    this.postService.post(formData).subscribe(data => {
      this.creatForm.get('text')?.setValue('');
      this.clearPreviewImage();
    })
      .add(() => {
        this.posting = false;
      });
  }

  onFileChanged(event: any): void {
    const files = event.target.files;
    if (files.length === 0){
      return;
    }

    // const mimeType = files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   this.message = "Only images are supported.";
    //   return;
    // }

    const reader = new FileReader();
    this.files = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      this.uploadImageUrl = reader.result;
    }
  }

  onCloseImageClick(): void {
    this.clearPreviewImage();
  }

  clearPreviewImage(): void {
    this.uploadImageUrl = null;
    this.files = null;
  }

}
