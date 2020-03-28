import { Component, OnInit } from '@angular/core';
import { Scrum } from 'src/app/models/scrum.model';
import { ScrumService } from '../scrums/scrum.service';
import { ScrumRepository } from 'src/app/repository/scrum.repository';

@Component({
  selector: 'app-view-scrums',
  templateUrl: './view-scrums.component.html',
  styleUrls: ['./view-scrums.component.css']
})
export class ViewScrumsComponent implements OnInit {

  isNotEmpty : boolean = true;
  scrums : Scrum[];
  constructor(private scrumScrvice : ScrumService,
              private scrumRepository : ScrumRepository) { }

  ngOnInit() {
    this.scrums = this.scrumScrvice.scrum;
    if(this.scrumScrvice.scrum.length===0){
      this.isNotEmpty = false;
    }
  }

  deleteScrum(scrumName : string){
    this.scrumScrvice.reamoveScrum(scrumName);
    if(this.scrumScrvice.scrum.length===0){
      this.isNotEmpty = false;
    }
    this.scrumRepository.deleteScrum(scrumName);
  }
}
