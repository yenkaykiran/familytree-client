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
          for (var i = 0; i < res.length; i++) {
              var m = res[i];
              var d = {
                  data: {
					  id: m.id,
					  label: m.name
				  }
              };
              this.graphData.nodes.push(d);
              this.prepareEdges(m.id, m.son, "Son", "#F98866", 'to');
              this.prepareEdges(m.id, m.daughter, "Daughter", "#FF420E", 'to');
              if (m.gender.toString() == "MALE") {
                  this.prepareEdges(m.id, m.spouse, "Spouse", "#80BD9E", 'from,to');
              }
          }
      });
  }

  prepareEdges(id: number, array: number[], edgeLabel: string, edgeColor: string, arrows: string) {
      if (array && array.length > 0) {
          for (var j = 0; j < array.length; j++) {
              /*var e = {
                  from: id,
                  to: array[j],
                  arrows: arrows,
                  label: edgeLabel,
                  color: {
                      color: edgeColor
                  },
                  font: {
                    size: 32
                  },
                  length: 150,
				  id: id + "-" + array[j],
				  kind: "parent"
              };*/
			  var e = {
				data: {
					source: id,
					target: array[j],
					label: edgeLabel
				}
              };
              this.graphData.edges.push(e);
          }
      }
  }
}
