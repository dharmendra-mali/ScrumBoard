import { Injectable } from '@angular/core';
import { Scrum } from '../models/scrum.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ScrumRepository {

    private url = "http://10.130.153.138:8000/scrum_api/";
    private httpHeader = new HttpHeaders({'Content-Type': 'application/json'});
    constructor(private http : HttpClient){}

    crateScrum(scrum : Scrum){
        this.http.post(this.url + "save",scrum, {headers : this.httpHeader}).subscribe();
    }

    getAllScrum() : Observable<Scrum[]> {
        return this.http.get<Scrum[]>(this.url+"scrum",{headers: this.httpHeader})
    }

    deleteScrum(scrumName : string) {
        this.http.delete(this.url + "delete/"+scrumName).subscribe();
    }

    updateScrum(scrum : Scrum){
        this.http.put(this.url+"update_scrum", JSON.stringify(scrum) ,{headers : this.httpHeader}).subscribe();
    }

    removeTask(story : string, scrumName : string){
        this.http.put(this.url+"release/"+story+"/"+scrumName,{headers: this.httpHeader}).subscribe();
    }
}