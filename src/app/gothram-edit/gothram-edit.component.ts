import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Gothram } from '../model/gothram';
import { GothramService } from '../gothram/gothram.service';

@Component({
  selector: 'app-gothram-edit',
  templateUrl: './gothram-edit.component.html',
  styleUrls: ['./gothram-edit.component.css']
})
export class GothramEditComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal, private service: GothramService) { }

  @Input('gothram') gothram: Gothram;

  ngOnInit() {
  }

  save() {
    this.service.save(this.gothram).subscribe((res: Gothram) => {
      this.activeModal.close(res);
    });
  }
}
