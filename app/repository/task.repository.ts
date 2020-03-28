  
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class TaskRepository{
    
    url = "http://10.130.153.138:8000/task_api/";
    httpHeader = new HttpHeaders({'Content-Type' : 'application/json'});
    constructor(private http: HttpClient){}

    updateStatus(notes : string, scrumName : string, userId : string){
        this.http.put(this.url+"update_status/"+notes+"/"+scrumName+"/"+userId, {headers : this.httpHeader}).subscribe();
    }

    removeStatus(notes : string, scrumName : string){
        this.http.put(this.url+"remove_status/"+notes+"/"+scrumName, {headers : this.httpHeader}).subscribe();
    }
}