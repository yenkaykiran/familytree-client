import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { GothramService } from './gothram.service';

import { Gothram } from '../model/gothram';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { GothramEditComponent } from '../gothram-edit/gothram-edit.component';

@Component({
  selector: 'app-gothram',
  templateUrl: './gothram.component.html',
  styleUrls: ['./gothram.component.css']
})
export class GothramComponent implements OnInit {

  constructor(private service: GothramService, private modalService: NgbModal) { }

  @Input('gothram') gothram: Gothram;

  ngOnInit() {

  }

  open() {
    const modalRef = this.modalService.open(GothramEditComponent, { size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.gothram = JSON.parse(JSON.stringify(this.gothram));
    modalRef.result.then((result) => {
      this.gothram = result;
    }, (result) => { });
  }

  delete() {
    this.service.delete(this.gothram.id).subscribe((response) => {
      this.gothram = null;
    });
  }

  // fetchRelated(rel: string, title: string) {
  //   this.related.emit({
  //     'relation': rel,
  //     'title': title
  //   });
  // }
}
