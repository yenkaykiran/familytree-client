import { Component, OnInit } from '@angular/core';

import { MemberData } from "../model/member-data";

import { MemberService } from '../member/member.service';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css']
})
export class RenderComponent implements OnInit {

  constructor(private service: MemberService) { }

  mData: MemberData[];

  faveColor = '#6FB1FC';
  faveShape = 'ellipse';

  // graphData = {
  //       nodes: [
  //           {data: {id: 'j', name: 'Jerry', faveColor: '#6FB1FC', faveShape: 'ellipse'}},
  //           {data: {id: 'e', name: 'Elaine', faveColor: '#EDA1ED', faveShape: 'ellipse'}}
  //       ],
  //       edges: [
  //           {data: {source: 'j', target: 'e', faveColor: '#6FB1FC'}},
  //           {data: {source: 'e', target: 'j', faveColor: '#EDA1ED'}}
  //       ]
  //   };
  graphData = {
    nodes: [],
    edges: []
  };

  ngOnInit() {
    this.service.export().subscribe((res: MemberData[]) => {
      this.mData = res;
      this.graphData = {
        nodes: [],
        edges: []
      };
      for(var i = 0; i < res.length; i++) {
        var m = res[i];
        var d = {data: {id: m.id, name: m.name, faveColor: this.faveColor, faveShape: this.faveShape}};
        this.graphData.nodes.push(d);
        this.prepareEdges(m.id, m.son);
        this.prepareEdges(m.id, m.daughter);
        this.prepareEdges(m.id, m.spouse);
      }
    });
  }

  prepareEdges(id: number, array: number[]) {
    if(array && array.length > 0) {
      for(var j = 0; j < array.length; j++) {
        var e = {data: {source: id, target: array[j], faveColor: this.faveColor}};
        this.graphData.edges.push(e);
      }
    }
  }

}
