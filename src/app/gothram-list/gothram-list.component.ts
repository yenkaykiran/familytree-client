import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { GothramService } from '../gothram/gothram.service';
import { Gothram, GothramHolder } from '../model/gothram';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GothramEditComponent } from '../gothram-edit/gothram-edit.component';

@Component({
  selector: 'app-gothram-list',
  templateUrl: './gothram-list.component.html',
  styleUrls: ['./gothram-list.component.css']
})
export class GothramListComponent implements OnInit {

  constructor(private service: GothramService, private modalService: NgbModal, private route: ActivatedRoute) { }

  gothrams: Gothram[];
  gothramsHolder: GothramHolder;
  numbers;
  parent: Gothram;
  title: string;
  event: any;

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let name = params.get('name');
      if(name) {
        this.getAllByName(name);
      } else {
        this.getAll();
      }
    });
  }

  getAll() {
    this.service.getAll().subscribe((res: GothramHolder) => {
      this.gothramsHolder = res;
      this.gothrams = res.gothrams;
    });
  }

  getAllByName(name) {
    this.parent = null;
    if(name) {
      this.service.getAllByName(name).subscribe((res: GothramHolder) => {
        this.gothramsHolder = res;
        this.gothrams = res.gothrams;
      });
    } else {
      this.getAll();
    }
  }

  add() {
    const modalRef = this.modalService.open(GothramEditComponent, { size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.gothram = new Gothram();
    modalRef.result.then((result) => {
      this.getAll();
    }, (result) => {
      this.getAll();
    });
  }

}
