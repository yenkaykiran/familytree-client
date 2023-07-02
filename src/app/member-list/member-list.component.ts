import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { MemberService } from '../member/member.service';
import { Member, MemberHolder } from '../model/member';
import { MemberData } from "../model/member-data";
import { ActivatedRoute, ParamMap } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MemberEditComponent } from '../member-edit/member-edit.component';
import { MemberLinkComponent } from '../member-link/member-link.component';

import { Gothram, GothramHolder } from '../model/gothram';
import { GothramService } from '../gothram/gothram.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  constructor(private service: MemberService, private modalService: NgbModal, private route: ActivatedRoute, private gService: GothramService) { }

  members: Member[];
  membersHolder: MemberHolder;
  page = 0;
  previousPage = 0;
  numbers;
  parent: Member;
  title: string;
  event: any;

  gothrams: Gothram[];

  showRender = false;
  showRenderCyto = false;
  mData: MemberData[];
  graphData = {
    nodes: [],
    edges: []
  };

  ngOnInit() {
    this.getAllGothrams();
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
    this.parent = null;
    this.service.getAll(this.page).subscribe((res: MemberHolder) => {
      this.membersHolder = res;
      this.members = res.members;
      this.preparePages();
    });
  }

  getAllByName(name) {
    this.parent = null;
    if(name) {
      this.service.getAllByName(name).subscribe((res: MemberHolder) => {
        this.membersHolder = res;
        this.members = res.members;
        this.preparePages();
      });
    } else {
      this.getAll();
    }
  }

  loadPage(p: number) {
    if (p !== this.previousPage) {
      this.previousPage = p;
      this.page = p;
      this.getAll();
    }
  }

  add() {
    const modalRef = this.modalService.open(MemberEditComponent, { size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.member = new Member();
    modalRef.result.then((result) => {
      this.getAll();
    }, (result) => {
      this.getAll();
    });
  }

  syncSpouse() {
    this.service.syncSpouse().subscribe((res: void) => {
      this.getAll();
    });
  }

  fetchRelatedAgain(member: Member) {
    this.fetchRelated(this.event, member);
  }

  fetchRelated($event, member: Member) {
    this.parent = member;
    this.title = $event.title;
    this.event = $event;
    member[$event.relation] = null;
    this.service.fetchRelated($event.relation, member).subscribe((res: Member[]) => {
      member[$event.relation] = res;
    });
  }

  preparePages() {
    this.numbers = Array.from(Array(this.membersHolder.totalPages)).map((x,i)=>i);
  }

  getAllGothrams() {
    this.gService.getAll().subscribe((res: GothramHolder) => {
      this.gothrams = res.gothrams;
    });
  }

  miniRender() {
	this.showRender = false;
    this.showRenderCyto = false;
    this.service.miniExport(this.parent.id).subscribe((res: MemberData[]) => {
        this.mData = res;
        this.graphData = {
            nodes: [],
            edges: []
        };
        for (var i = 0; i < res.length; i++) {
            var m = res[i];
            var d = {
                id: m.id,
                label: m.name,
                title: m.familyName,
                group: m.gothram
            };
            this.graphData.nodes.push(d);
            this.prepareEdges(m.id, m.son, "Son", "#F98866", 'to');
            this.prepareEdges(m.id, m.daughter, "Daughter", "#FF420E", 'to');
            if (m.gender.toString() == "MALE") {
                this.prepareEdges(m.id, m.spouse, "Spouse", "#80BD9E", 'from,to');
            }
        }
        this.showRender = true;
    });
  }

  miniRenderCyto() {
	this.showRender = false;
    this.showRenderCyto = false;
    this.service.miniExport(this.parent.id).subscribe((res: MemberData[]) => {
        this.mData = res;
        this.graphData = {
            nodes: [],
            edges: []
        };
        for (var i = 0; i < res.length; i++) {
            var m = res[i];
            var d = {
			    data: {
				  id: m.id,
				  label: m.name
			    }
		    };
            this.graphData.nodes.push(d);
            this.prepareEdgesCyto(m.id, m.son, "Son", "#9dbaea", 'to', 'none');
            this.prepareEdgesCyto(m.id, m.daughter, "Daughter", "#FF420E", 'to', 'none');
            if (m.gender.toString() == "MALE") {
                this.prepareEdgesCyto(m.id, m.spouse, "Spouse", "#80BD9E", 'from,to', 'triangle');
            }
        }
        this.showRenderCyto = true;
    });
  }

  prepareEdges(id: number, array: number[], edgeLabel: string, edgeColor: string, arrows: string) {
      if (array && array.length > 0) {
          for (var j = 0; j < array.length; j++) {
              var e = {
                  from: id,
                  to: array[j],
                  arrows: arrows,
                  label: edgeLabel,
                  color: {
                      color: edgeColor
                  }
              };
              this.graphData.edges.push(e);
          }
      }
  }

  prepareEdgesCyto(id: number, array: number[], edgeLabel: string, edgeColor: string, arrows: string, sourceArrow: string) {
      if (array && array.length > 0) {
          for (var j = 0; j < array.length; j++) {
              var e = {
				data: {
					source: id,
					target: array[j],
					label: edgeLabel,
					sarrow: sourceArrow,
					tarrow: 'triangle',
					color: edgeColor
				}
              };
              this.graphData.edges.push(e);
          }
      }
  }

  id(member:Member) {
	  return member.id;
  }
}
