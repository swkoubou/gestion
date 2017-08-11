import { async, ComponentFixture, TestBed } from '@angular/core/testing';
 import { FormsModule } from '@angular/forms';
 import { RouterTestingModule } from '@angular/router/testing';
 import { HttpModule,JsonpModule } from '@angular/http';
import { RequestService} from '../request.service';
import { CreateuserComponent } from './createuser.component';

describe('CreateuserComponent', () => {
  let component: CreateuserComponent;
  let fixture: ComponentFixture<CreateuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule,HttpModule,JsonpModule],
      declarations: [ CreateuserComponent ],
      providers:[RequestService]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
