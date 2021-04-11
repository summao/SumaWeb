import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-crop-modal',
  templateUrl: './crop-modal.component.html',
  styleUrls: ['./crop-modal.component.css']
})
export class CropModalComponent implements OnInit {
  @Output() croppedEvent = new EventEmitter<Blob>();

  imageChangedEvent!: any;
  croppedImage!: any;
  element!: HTMLInputElement;

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

  onSaveClicked(): void {
    const blob = base64ToFile(this.croppedImage);
    this.croppedEvent.emit(blob);
    this.clearData();
  }

  clearData(): void {
    this.imageChangedEvent = null;
    this.element.value = '';
    this.croppedImage = null;
  }

}
