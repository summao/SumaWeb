import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-crop-modal',
  templateUrl: './crop-modal.component.html',
  styleUrls: ['./crop-modal.component.css']
})
export class CropModalComponent implements OnInit {
  imageChangedEvent!: any;
  croppedImage: any = '';
  element!: HTMLInputElement

  constructor() { }

  ngOnInit(): void {
    this.element = document.getElementById('file') as HTMLInputElement;
  }

  onFileChanged(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  onUploadPhotoClicked(): void {
    this.element.click();
  }

  onCancelClicked(): void {
    this.imageChangedEvent = null;
    this.element.value = '';
  }

}
