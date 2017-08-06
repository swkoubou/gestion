import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router';

@Component({
  selector: 'app-login-group',
  templateUrl: './login-group.component.html',
  styleUrls: ['./login-group.component.css']
})
export class LoginGroupComponent implements OnInit {
  GroupName:string;
  Error:string;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  Change_Page():void{
    if(!this.GroupName){
      this.Error = 'グループ名を入力してください';
      return;
    }
    sessionStorage.setItem('GroupName', this.GroupName);
    this.router.navigate(['/loginuser']);
  }

  Change_CreateGroup():void{
    this.router.navigate(['/creategroup']);
  }
}
