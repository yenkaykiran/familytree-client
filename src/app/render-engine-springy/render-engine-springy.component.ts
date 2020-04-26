import {Component, OnChanges, Renderer, ElementRef, Input, Output, EventEmitter, OnInit} from '@angular/core';

import { Springy } from 'springy';

import { Network, DataSet, Node, Edge } from 'vis';

var Dracula = require('graphdracula')

@Component({
  selector: 'app-render-engine-springy',
  templateUrl: './render-engine-springy.component.html',
  styleUrls: ['./render-engine-springy.component.css']
})
export class RenderEngineSpringyComponent implements OnChanges, OnInit {

    constructor(private renderer : Renderer, private el: ElementRef) { }

    @Input("elements") public elements: any;
    @Input() public style: any;
    @Input() public layout: any;
    @Input() public zoom: any;
    @Output() select: EventEmitter<any> = new EventEmitter<any>();

    ngOnChanges(): any {
        this.render();
    }

    ngOnInit() {

    }

    render() {

      var Graph = Dracula.Graph
      var Renderer = Dracula.Renderer.Raphael
      var Layout = Dracula.Layout.Spring

      var graph = new Graph()

      graph.addEdge('Banana', 'Apple')
      graph.addEdge('Apple', 'Kiwi')
      graph.addEdge('Apple', 'Dragonfruit')
      graph.addEdge('Dragonfruit', 'Banana')
      graph.addEdge('Kiwi', 'Banana')

      var layout = new Layout(graph)
      var renderer = new Renderer('#paper', graph, 400, 300)
      renderer.draw()

    }
}
