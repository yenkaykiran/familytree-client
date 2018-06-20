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

  constructor(private activeModal: NgbActiveModal, private service: MemberService, private gService: GothramService) { }

  @Input('member') member: Member;

  gothrams: Gothram[];

  ngOnInit() {
  }

  save() {
    this.service.save(this.member).subscribe((res: Member) => {
      this.activeModal.close(res);
    });
  }
}
