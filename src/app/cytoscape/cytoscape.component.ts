import {Component, OnChanges, Renderer, ElementRef, Input, Output, EventEmitter} from '@angular/core';

declare var jQuery: any;
declare var cytoscape: any;

@Component({
  selector: 'app-cytoscape',
  templateUrl: './cytoscape.component.html',
  styles: [`#cy {
          height: 100%;
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
      }`],
  styleUrls: ['./cytoscape.component.css']
})
export class CytoscapeComponent implements OnChanges {

    @Input() public elements: any;
    @Input() public style: any;
    @Input() public layout: any;
    @Input() public zoom: any;

    @Output() select: EventEmitter<any> = new EventEmitter<any>();

    public constructor(private renderer : Renderer, private el: ElementRef) {

      this.layout = this.layout || {
          name: 'grid',
          directed: true,
          padding: 0
      };

      this.zoom = this.zoom || {
          min: 0.1,
          max: 1.5
      };

      this.style = this.style || cytoscape.stylesheet()
          .selector('node')
          .css({
              'content': 'data(name)',
              'shape': 'rectangle',
              'text-valign': 'center',
              'background-color': 'data(faveColor)',
              'width': '200px',
              'height': '100px',
              'color': 'black'
          })
          .selector(':selected')
          .css({
              'border-width': 3,
              'border-color': '#333'
          })
          .selector('edge')
          .css({
              'label': 'data(label)',
              'color': 'black',
              'curve-style': 'bezier',
              'opacity': 0.666,
              'width': 'mapData(strength, 70, 100, 2, 6)',
              'target-arrow-shape': 'triangle'
              , 'line-color': 'data(faveColor)',
              'source-arrow-color': 'data(faveColor)',
              'target-arrow-color': 'data(faveColor)'
          })
          .selector('edge.questionable')
          .css({
              'line-style': 'dotted',
              'target-arrow-shape': 'diamond'
          })
          .selector('.faded')
          .css({
              'opacity': 0.25,
              'text-opacity': 0
          });
    }

    public ngOnChanges(): any {
        this.render();
        console.log(this.el.nativeElement);
    }

    public render() {
      let cy_contianer = this.renderer.selectRootElement("#cy");
      let localselect = this.select;
      let cy = cytoscape({
            container : cy_contianer,
            layout: this.layout,
            minZoom: this.zoom.min,
            maxZoom: this.zoom.max,
            style: this.style,
            elements: this.elements,
        });


        cy.on('tap', 'node', function(e) {
            var node = e.cyTarget;
            var neighborhood = node.neighborhood().add(node);

            cy.elements().addClass('faded');
            neighborhood.removeClass('faded');
            localselect.emit(node.data("name"));
        });

        cy.on('tap', function(e) {
                if (e.cyTarget === cy) {
                    cy.elements().removeClass('faded');
                }
        });
    }

}

export default CytoscapeComponent;
