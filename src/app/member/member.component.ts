import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { MemberService } from './member.service';

import { Member } from '../model/member';

import { Gothram, GothramHolder } from '../model/gothram';
import { GothramService } from '../gothram/gothram.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { MemberEditComponent } from '../member-edit/member-edit.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  constructor(private service: MemberService, private gService: GothramService, private modalService: NgbModal) { }

  @Input('member') member: Member;
  @Input('gothramId') gothramId: number;
  @Output('fetchRelated') related = new EventEmitter<any>();

  gothrams: Gothram[];

  ngOnInit() {
    this.getAllGothrams();
  }

  open() {
    const modalRef = this.modalService.open(MemberEditComponent, { size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.member = JSON.parse(JSON.stringify(this.member));
    modalRef.result.then((result) => {
      this.member = result;
    }, (result) => { });
  }

  delete() {
    this.service.delete(this.member.id).subscribe((response) => {
      this.member = null;
    });
  }

  fetchRelated(rel: string, title: string) {
    this.related.emit({
      'relation': rel,
      'title': title
    });
  }

  getAllGothrams() {
    this.gService.getAll().subscribe((res: GothramHolder) => {
      this.gothrams = res.gothrams;
      this.prepareGothram();
    });
  }

  prepareGothram() {
    for(var i = 0; i < this.gothrams.length; i++) {
      if(this.gothrams[i].id == this.member.gothramId) {
        this.member.gothram = this.gothrams[i];
        break;
      }
    }
  }

  attachGothram(m: Member, g: Gothram) {
    console.log(m);
    this.service.attachGothram(m, g).subscribe((response: Member) => {
      this.member = response;
      this.prepareGothram();
    });
  }
}
