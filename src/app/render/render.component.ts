import { Component, OnInit } from '@angular/core';

import { Gender } from "../model/gender.enum";
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
        var d = {data: {id: m.id, name: m.name, faveColor: this.faveColor, faveShape: this.faveShape, shape: "ellipse"}};
        this.graphData.nodes.push(d);
        this.prepareEdges(m.id, m.son, "Son", "#FF8333");
        this.prepareEdges(m.id, m.daughter, "Daughter", "#56AF3C");
        if(m.gender.toString() == "MALE") {
          this.prepareEdges(m.id, m.spouse, "Wife", "#8C5438");
        }
      }
    });
  }

  prepareEdges(id: number, array: number[], edgeLabel: string, edgeColor: string) {
    if(array && array.length > 0) {
      for(var j = 0; j < array.length; j++) {
        var e = {data: {source: id, target: array[j], faveColor: edgeColor, label: edgeLabel}};
        this.graphData.edges.push(e);
      }
    }
  }

}
