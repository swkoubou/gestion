import { Component, OpaqueToken, Inject } from '@angular/core';
import { RequestService} from './../../request.service';
import { ModalService } from './../modal/modal.service';

//文字列やオブジェクトをトークンと紐づけることができる
export const COMPLETE_TEXT_TOKEN = new OpaqueToken('complete.text');

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent {
  public name: string;
  public email: string;
  public id: number;
  public password: string;
  public Error: string;
  public BackToken: string;

  // @inject...外のコンポーネントから値がもらえる
  constructor(@Inject(COMPLETE_TEXT_TOKEN) t: any, private modal:ModalService,
              private request:RequestService) {
    this.name = t.name;
    this.email = t.email;
    this.id = t.id;
  }

  Change_User():void{
    if(!this.password || !this.email){
      this.Error = "未入力箇所があります";
      return;
    }
    this.BackToken = sessionStorage.getItem("token");
    this.request.AdminChange(this.BackToken, this.password, this.email, this.id).subscribe(
      result => console.log(result),
      error => console.log(error)
    );
  }

  ModalClose():void {
    this.modal.close();
  }
}
