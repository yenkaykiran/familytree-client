import { Component, OnInit } from '@angular/core';

import { MemberData } from '../model/member-data';

import { MemberService } from '../member/member.service';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {

  constructor(private service: MemberService) { }

  importedData: MemberData[];

  ngOnInit() {
  }

  set pretty(imported: string) {
    this.importedData = JSON.parse(imported);
  }

  importContent() {
    this.service.importData(this.importedData).subscribe((res: Response) => {
      alert(res.statusText);
    });
  }

}
