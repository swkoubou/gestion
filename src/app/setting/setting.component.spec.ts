import { async, ComponentFixture, TestBed } from '@angular/core/testing';
 import { FormsModule } from '@angular/forms';
 import { RouterTestingModule } from '@angular/router/testing';
 import { HttpModule,JsonpModule } from '@angular/http';


import { RequestService} from '../request.service';
import { SettingComponent } from './setting.component';


import { UserlistComponent } from './../userlist/userlist.component';
import { UsersettingComponent } from './../usersetting/usersetting.component';
import { CreateuserComponent } from './../createuser/createuser.component';

import { ModalService } from './../userlist/modal/modal.service';
import { CompleteComponent, COMPLETE_TEXT_TOKEN } from './../userlist/complete/complete.component';

describe('SettingComponent', () => {
  let component: SettingComponent;
  let fixture: ComponentFixture<SettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule,HttpModule,JsonpModule],
      declarations: [ SettingComponent,UserlistComponent, UsersettingComponent, CreateuserComponent ],
      providers:[RequestService,ModalService, CompleteComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
