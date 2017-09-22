import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent implements OnInit {
  name: string;
  data: any;
  cropperSettings: CropperSettings;
  croppedWidth: number;
  croppedHeight: number;
  @ViewChild('cropper') cropper: ImageCropperComponent;
  @Output() imageChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;
    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;
    this.cropperSettings.canvasWidth = 150;
    this.cropperSettings.canvasHeight = 150;
    this.cropperSettings.minWidth = 10;
    this.cropperSettings.minHeight = 10;
    this.cropperSettings.rounded = false;
    this.cropperSettings.keepAspect = false;
    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.data = {};
  }

  cropped(bounds: Bounds): void {
    this.croppedHeight = bounds.bottom - bounds.top;
    this.croppedWidth = bounds.right - bounds.left;
    this.imageChanged.emit(this.data.image);
  }

  fileChangeListener($event): void {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      this.cropper.setImage(image);
      this.imageChanged.emit(myReader.result);
    };

    myReader.readAsDataURL(file);
  }
}

