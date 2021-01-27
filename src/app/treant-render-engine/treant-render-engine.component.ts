import { Component, OnChanges, Renderer, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';

//import { "sigma.parsers.json" as sigmaparser } from 'sigma';

import Sigma from 'sigma';

@Component({
  selector: 'app-treant-render-engine',
  templateUrl: './treant-render-engine.component.html',
  styleUrls: ['./treant-render-engine.component.css']
})
export class TreantRenderEngineComponent implements OnInit {

  @Input("elements") public elements: any;

  private sigma: any;

  constructor() { }

  ngOnInit() {
    var graph = {
      nodes: [
        { id: "n0", label: "A node", x: 0, y: 0, size: 3, color: '#008cc2' },
        { id: "n1", label: "Another node", x: 3, y: 1, size: 2, color: '#008cc2' },
        { id: "n2", label: "And a last one", x: 1, y: 3, size: 1, color: '#E57821' }
      ],
      edges: [
        { id: "e0", source: "n0", target: "n1", color: '#282c34', type: 'line', size: 0.5 },
        { id: "e1", source: "n1", target: "n2", color: '#282c34', type: 'curve', size: 1 },
        { id: "e2", source: "n2", target: "n0", color: '#FF0000', type: 'line', size: 2 }
      ]
    };


    if (this.elements && this.elements.nodes && this.elements.nodes.length > 0) {
      this.sigma = new Sigma(
        {
          renderer: {
            container: document.getElementById("sigma-container"),
            type: 'canvas'
          },
          settings: {
            edgeColor: 'default',
            defaultNodeColor: '#ec5148',
            defaultEdgeColor: '#dbc09b',
            font: "calibri",
            labelSize: "proportional",
            boderSize: 1,
            sideMargin: 20,
            zoomMax: 1
          },
          function(s) {
            s.graph.nodes().forEach(function(n){
              n.type = 'square';
            });
            // We first need to save the original colors of our
            // nodes and edges, like this:
            s.graph.nodes().forEach(function(n) {
              n.originalColor = n.color;
            });
            s.graph.edges().forEach(function(e) {
              e.originalColor = e.color;
            });

            // When a node is clicked, we check for each node
            // if it is a neighbor of the clicked one. If not,
            // we set its color as grey, and else, it takes its
            // original color.
            // We do the same for the edges, and we only keep
            // edges that have both extremities colored.
            s.bind('overNode', function(e) {
              var nodeId = e.data.node.id,
                  toKeep = s.graph.neighbors(nodeId);
              toKeep[nodeId] = e.data.node;

              s.graph.nodes().forEach(function(n) {
                if (toKeep[n.id])
                  n.color = n.originalColor;
                else
                  n.color = '#eee';
              });

              s.graph.edges().forEach(function(e) {
                if (toKeep[e.source] && toKeep[e.target])
                  e.color = e.originalColor;
                else
                  e.color = '#eee';
              });
              s.refresh()
            });
            // When the stage is clicked, we just color each
            // node and edge with its original color.
            s.bind('outNode', function(e) {
              s.graph.nodes().forEach(function(n) {
                n.color = n.originalColor;
              });

              s.graph.edges().forEach(function(e) {
                e.color = e.originalColor;
              });

              // Same as in the previous event:
              s.refresh();
            });

            s.startForceAtlas2();

            setTimeout(function () {
              console.log('stopping')
              s.stopForceAtlas2()
              }, 10000)

            // setInterval(addNode, 3000)
          }
        }
      );
      this.sigma.graph.read(this.elements);
      //this.sigma.startForceAtlas2();
      this.sigma.refresh();
      console.log(this.elements);
    }
  }
}
