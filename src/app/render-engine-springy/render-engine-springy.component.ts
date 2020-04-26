import {Component, OnChanges, Renderer, ElementRef, Input, Output, EventEmitter, OnInit} from '@angular/core';

var cytoscape = require('cytoscape');
var dagre = require('cytoscape-dagre');

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

	btnVisible = false;
	
	cy: any;
	
    ngOnChanges(): any {
        console.log(this.elements);
		cytoscape.use(dagre);
		this.render();
    }

    ngOnInit() {
		//cytoscape.use(dagre);
		//this.render();
    }

    render() {
		
		  this.cy = cytoscape({
          container: document.getElementById('cy'),

		  boxSelectionEnabled: false,
		  autounselectify: true,
		  textureOnViewport: true,
		  hideEdgesOnViewport: true,

          layout: {
            name: 'dagre'
          },

          style: [
            {
              selector: 'node',
              style: {
                  //'background-color': '#11479e',
				  'label': 'data(label)',
				  'text-valign': 'center',
				  'text-halign': 'center',
				  'width': 'label',
				  'height': 'label',
				  //'shape': 'roundrectangle',
				  'padding': '10px'
				  //'background-color': "#4fbcef"
			  }
            },

            {
              selector: 'edge',
              style: {
                'width': 4,
                'target-arrow-shape': 'triangle',
                'line-color': '#9dbaea',
                'target-arrow-color': '#9dbaea',
                'curve-style': 'bezier',
				
              'label': 'data(label)',
              'text-background-color': 'white',
              'text-background-opacity': '1',
              'text-border-color': 'black',
              'text-border-opacity': '1',
              'text-border-width': '1',
              'text-background-shape': 'rectangle',
              'text-background-padding': '3px'
              }
            }
          ],

          elements: this.elements
        });
		this.btnVisible = false;

    }
	
	save() {
	  
	}
	
}
