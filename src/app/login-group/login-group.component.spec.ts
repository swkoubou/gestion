import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule,JsonpModule } from '@angular/http';
import { RequestService} from '../request.service';
import { LoginGroupComponent } from './login-group.component';

describe('LoginGroupComponent', () => {
  let component: LoginGroupComponent;
  let fixture: ComponentFixture<LoginGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule,HttpModule,JsonpModule],
      declarations: [ LoginGroupComponent ],
      providers:[RequestService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
