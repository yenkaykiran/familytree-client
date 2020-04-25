import {Component, OnChanges, Renderer, ElementRef, Input, Output, EventEmitter, OnInit} from '@angular/core';

import { Network, DataSet, Node, Edge } from 'vis';

@Component({
  selector: 'app-render-engine',
  templateUrl: './render-engine.component.html',
  styleUrls: ['./render-engine.component.css']
})
export class RenderEngineComponent implements OnChanges, OnInit {

    constructor(private renderer : Renderer, private el: ElementRef) { }

    @Input("elements") public elements: any;
    @Input() public style: any;
    @Input() public layout: any;
    @Input() public zoom: any;
    @Output() select: EventEmitter<any> = new EventEmitter<any>();

    nodes: Node;
    edges: Edge;

    offsetx = 0;
    offsety = 0;
    scale = 1;
    positionx = 300;
    positiony = 300;
    duration = 10000;
    easingFunction = "easeInOutQuad";
    showInterval = true;
    amountOfNodes = 25;
    showPhase = 1;

    network : Network;

    btnVisible = false;

    ngOnChanges(): any {
        this.render();
    }

    ngOnInit() {
      setTimeout(() => {
        this.startShow();
        this.btnVisible = true;
      }, 5000);
    }

    focusRandom() {
      if(this.elements && this.elements.nodes && this.elements.nodes.length > 0) {
        var nodeId = this.elements.nodes[Math.floor(Math.random() * this.elements.nodes.length)].id;
        var options = {
            scale: this.scale,
            offset: {
                x: this.offsetx,
                y: this.offsety
            },
            animation: {
                duration: this.duration,
                easingFunction: this.easingFunction
            }
        };
        this.network.focus(nodeId, options);
      }
    }

    doTheShow() {
        if (this.showInterval == true) {
            if (this.showPhase == 0) {
                this.focusRandom();
                this.showPhase = 1;
            } else {
                this.fitAnimated();
                this.showPhase = 0;
            }
            setTimeout(() => {
              this.doTheShow();
            }, this.duration / 2);
        }
    }

    fitAnimated() {
        var options = {
            offset: {
                x: this.offsetx,
                y: this.offsety
            },
            duration: this.duration,
            easingFunction: this.easingFunction
        };
        this.network.fit({
            animation: options
        });
    }

    startShow() {
        if (this.showInterval !== false) {
            this.showInterval = false;
            if (this.network) {
                this.network.fit();
            }
        } else {
            this.focusRandom();
            setTimeout(() => {
              this.doTheShow();
            }, this.duration);
            this.showInterval = true;
        }
    }

    render() {
        var nodes = new DataSet(this.elements.nodes);
        var edges = new DataSet(this.elements.edges);

        var container = document.getElementById('cy');
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {
            autoResize: true,
            height: '100%',
            width: '100%',
            nodes: {
              font: {
                size: 20
              }
            },
			layout: {
			  improvedLayout:true,
			  hierarchical: {
				direction: 'UD',
				sortMethod: "directed",
				nodeSpacing: 1500,
				levelSeparation: 300,
				edgeMinimization: true,
				blockShifting: true
			  }
			},
			physics: {
			  hierarchicalRepulsion: {
				avoidOverlap: 1
			  }
			}
            // ,
            // layout: {
            //   improvedLayout:true,
            //   hierarchical: {
            //     enabled:true,
            //     levelSeparation: 150,
            //     nodeSpacing: 100,
            //     treeSpacing: 200,
            //     blockShifting: true,
            //     edgeMinimization: true,
            //     parentCentralization: true,
            //     direction: 'UD',        // UD, DU, LR, RL
            //     sortMethod: 'hubsize'   // hubsize, directed
            //   }
            // }
        };
        this.network = new Network(container, data, options);
        this.network.on("afterDrawing", function (ctx) {
          var dataURL = ctx.canvas.toDataURL();
          var link = document.getElementById('link');
          if(link) {
            link.setAttribute('download', 'NK-Tree.png');
            link.setAttribute('href', ctx.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
          }
          // link.click();
        });
    }
}
