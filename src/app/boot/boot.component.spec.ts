import { async, ComponentFixture, TestBed } from '@angular/core/testing';

 import { RouterTestingModule } from '@angular/router/testing';

import { BootComponent } from './boot.component';

import { CookieService } from 'angular2-cookie/core';

class mockCookieService {
    getObject(name: string) {
        return true;
    }
}

describe('BootComponent', () => {
  let component: BootComponent;
  let fixture: ComponentFixture<BootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BootComponent],
      //providers:[{ provide: CookieService, useClass: mockCookieService },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
