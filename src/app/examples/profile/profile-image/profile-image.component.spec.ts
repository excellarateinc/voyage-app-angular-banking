import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageCropperModule } from 'ng2-img-cropper';
import { SharedModule } from '../../../shared/shared.module';
import { ProfileImageComponent } from './profile-image.component';

describe('ProfileImageComponent', () => {
  let component: ProfileImageComponent;
  let fixture: ComponentFixture<ProfileImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ImageCropperModule
      ],
      declarations: [ ProfileImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
