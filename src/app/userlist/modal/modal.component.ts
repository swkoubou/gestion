import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('inner', { read: ViewContainerRef }) vcr;
  private subscription: Subscription;
  public display = 'none';

  constructor(private modal: ModalService) { }

  //描画後に処理を行う
  ngAfterViewInit() {
    this.modal.vcr = this.vcr;
  }

  //サブスクリプションを作成
  ngOnInit() {
    this.subscription = this.modal.content$.subscribe(
      value => {
        if (value) {
          this.display = '';
        } else {
          this.display = 'none';
        }
      });
  }

  //イベントを中断させる
  containerClick($event) {
    $event.stopPropagation();
  }

  //モーダルを閉じる
  close() {
    this.modal.close();
  }

  //サブスクリプションを削除する
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
