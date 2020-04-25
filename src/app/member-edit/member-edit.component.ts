import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Member } from '../model/member';
import { MemberService } from '../member/member.service';

import { Gothram, GothramHolder } from '../model/gothram';
import { GothramService } from '../gothram/gothram.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  constructor(private activeModalF: NgbActiveModal, private service: MemberService, private gService: GothramService) { }

  @Input('member') member: Member;

  gothrams: Gothram[];
  gothram: Gothram;
  isSaving: boolean;

  ngOnInit() {
    this.isSaving = false;
    this.getAllGothrams();
  }

  save() {
    this.isSaving = true;
    if(this.gothram) {
      this.member.gothramId = this.gothram.id;
    }
    this.service.save(this.member).subscribe((res: Member) => {
      this.isSaving = false;
      this.service.attachGothram(res, this.gothram).subscribe((response: Member) => {
        this.member = response;
        this.prepareGothram();
      });
      this.activeModalF.close(res);
    });
  }

  getAllGothrams() {
    this.gService.getAll().subscribe((res: GothramHolder) => {
      this.gothrams = res.gothrams;
      this.prepareGothram();
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
  
  activeModal() {
	  return this.activeModalF;
  }
}
