import {Component, OnChanges, Renderer, ElementRef, Input, Output, EventEmitter, OnInit} from '@angular/core';

var cytoscape = require('cytoscape');
var dagre = require('cytoscape-dagre');
var klay = require('cytoscape-klay');

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
		    //cytoscape.use(dagre);
        cytoscape.use(klay);
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
            name: 'klay'
            //rankDir: 'TB',
            //ranker: 'tight-tree'
            //edgeSep: 20,
            //nodeSep: 5
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
                'source-arrow-shape': 'data(sarrow)',
				'target-arrow-shape': 'data(tarrow)',
                'line-color': 'data(color)',
				'source-arrow-color': 'data(color)',
                'target-arrow-color': 'data(color)',
                'curve-style': 'bezier',

              'label': 'data(label)',
              'text-background-color': 'white',
              'text-background-opacity': '1',
              'text-border-color': 'data(color)',
              'text-border-opacity': '1',
              'text-border-width': '1',
              'text-background-shape': 'rectangle',
              'text-background-padding': '3px'
              }
            }
          ],

          elements: this.elements
        });
		this.btnVisible = true;
		
		this.cy.ready(function () {
		  this.btnVisible = true;
		  //if you want to create the img tag afterwards:
		  //$('#right').prepend("<img id='png-eg'>");
		  
		  if(this.cy) {
			  var png64 = this.cy.png();
			  // put the png data in an img tag
			  var imgTag = document.getElementById('png-eg');
			  imgTag['src'] = png64;
		  }
		});

    }

	save() {
		var png64 = this.cy.png();
		  // put the png data in an img tag
		  var imgTag = document.getElementById('png-eg');
		  imgTag['src'] = png64;
	}

}
