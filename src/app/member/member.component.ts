import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { MemberService } from './member.service';

import { Member } from '../model/member';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { MemberEditComponent } from '../member-edit/member-edit.component';

import { Gothram, GothramHolder } from '../model/gothram';
import { GothramService } from '../gothram/gothram.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  constructor(private service: MemberService, private modalService: NgbModal) { }

  @Input('member') member: Member;
  @Input('gothramId') gothramId: number;
  @Output('fetchRelated') related = new EventEmitter<any>();

  @Input('gothrams') gothrams: Gothram[];
  gothram: Gothram;

  ngOnInit() {
    this.prepareGothram();
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

  prepareGothram() {
    if(this.gothrams && this.gothrams.length > 0 && this.member.gothramId) {
      for(var i = 0; i < this.gothrams.length; i++) {
        if(this.gothrams[i].id == this.member.gothramId) {
          this.gothram = this.gothrams[i];
          break;
        }
      }
    }
  }

  save() {
    if(this.gothram) {
      this.member.gothramId = this.gothram.id;
    }
    this.service.attachGothram(this.member, this.gothram).subscribe((response: Member) => {
      this.member = response;
      this.prepareGothram();
    });
  }
  
  makeRoot() {
	this.member.root = 'true';
    this.service.makeRoot(this.member).subscribe((response: Member) => {
      this.member = response;
      this.prepareGothram();
    });
  }
}
