import { Component, OnInit } from '@angular/core';

import { MemberData } from "../model/member-data";

import { MemberService } from '../member/member.service';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  constructor(private service: MemberService) { }

  exported: string;
  pretty: string;

  ngOnInit() {
    this.service.export().subscribe((res: MemberData[]) => {
      this.exported = JSON.stringify(res);
	  this.pretty = this.pretty1();
    });
  }

  pretty1() : string {
    var ugly = this.exported;
    var obj = JSON.parse(ugly);
    return JSON.stringify(obj, undefined, 4);
  }
}
