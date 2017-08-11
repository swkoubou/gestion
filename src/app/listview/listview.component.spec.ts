import { async, ComponentFixture, TestBed } from '@angular/core/testing';
 import { FormsModule } from '@angular/forms';
 import { RouterTestingModule } from '@angular/router/testing';
 import { HttpModule,JsonpModule } from '@angular/http';
import { RequestService} from '../request.service';
import { ListviewComponent } from './listview.component';

import { ChartsModule } from 'ng2-charts/ng2-charts';


describe('ListviewComponent', () => {
  let component: ListviewComponent;
  let fixture: ComponentFixture<ListviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule,HttpModule,JsonpModule,ChartsModule],
      declarations: [ ListviewComponent],
      providers:[RequestService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
