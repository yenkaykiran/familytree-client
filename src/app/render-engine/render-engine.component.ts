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
    showInterval = false;
    amountOfNodes = 25;
    showPhase = 1;

    network : Network;

    ngOnChanges(): any {
        this.render();
    }

    ngOnInit() {
      setTimeout(() => {
        this.startShow();
      }, 5000);
    }

    focusRandom() {
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
            width: '100%'
        };
        this.network = new Network(container, data, options);
    }
}
