import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {
    this.service.export().subscribe((res: Response) => {
      this.exported = res.text();
    });
  }

  get pretty() : string {
    var ugly = this.exported;
    var obj = JSON.parse(ugly);
    return JSON.stringify(obj, undefined, 4);
  }
}
