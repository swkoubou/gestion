import { async, ComponentFixture, TestBed } from '@angular/core/testing';
 import { FormsModule } from '@angular/forms';
 import { RouterTestingModule } from '@angular/router/testing';
 import { HttpModule,JsonpModule } from '@angular/http';


import { CreategroupComponent } from './creategroup.component';
import { RequestService} from '../request.service';

describe('CreategroupComponent', () => {
  let component: CreategroupComponent;
  let fixture: ComponentFixture<CreategroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule,HttpModule,JsonpModule],
      declarations: [ CreategroupComponent ],
      providers:[RequestService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreategroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
