import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent{
  fa:string;

  constructor(private element: ElementRef) {}

  uho(event):void {
    var Data:File = event.target.files[0];
    if(Data.type.indexOf("image") < 0){
      alert("画像以外渡すなクソ");
      return;
    }

    var Image = this.element.nativeElement.querySelector('.image');
    var Reader = new FileReader();
    Reader.onload = function() {
        var Src = Reader.result;
        Image.src = Src;
    };
    Reader.readAsDataURL(event.target.files[0]);
  }

}
