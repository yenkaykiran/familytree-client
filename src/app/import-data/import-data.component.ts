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

  graphData = {
        nodes: [
            {data: {id: 'j', name: 'Jerry', faveColor: '#6FB1FC', faveShape: 'triangle'}},
            {data: {id: 'e', name: 'Elaine', faveColor: '#EDA1ED', faveShape: 'ellipse'}},
            {data: {id: 'k', name: 'Kramer', faveColor: '#86B342', faveShape: 'octagon'}},
            {data: {id: 'g', name: 'George', faveColor: '#F5A45D', faveShape: 'rectangle'}}
        ],
        edges: [
            {data: {source: 'j', target: 'e', faveColor: '#6FB1FC'}},
            {data: {source: 'j', target: 'k', faveColor: '#6FB1FC'}},
            {data: {source: 'j', target: 'g', faveColor: '#6FB1FC'}},

            {data: {source: 'e', target: 'j', faveColor: '#EDA1ED'}},
            {data: {source: 'e', target: 'k', faveColor: '#EDA1ED'}},

            {data: {source: 'k', target: 'j', faveColor: '#86B342'}},
            {data: {source: 'k', target: 'e', faveColor: '#86B342'}},
            {data: {source: 'k', target: 'g', faveColor: '#86B342'}},

            {data: {source: 'g', target: 'j', faveColor: '#F5A45D'}}
        ]
    };


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
