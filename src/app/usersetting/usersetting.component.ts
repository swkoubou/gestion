import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-usersetting',
  templateUrl: './usersetting.component.html',
  styleUrls: ['./usersetting.component.css']
})
export class UsersettingComponent {
  fa:string;

  constructor(private element: ElementRef) {}

  uho(event):void {
    var data:File = event.target.files[0];
    if(data.type.indexOf("image") < 0){
      alert("画像以外渡すなクソ");
      return;
    }

    var image = this.element.nativeElement.querySelector('.image');
    var reader = new FileReader();
    reader.onload = function() {
        var src = reader.result;
        image.src = src;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

}
