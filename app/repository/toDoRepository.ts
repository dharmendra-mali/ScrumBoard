import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from '../models/toDo.model';

@Injectable()
export class ToDoRepository{
    constructor(private http:HttpClient) { }

    private httpHeader = new HttpHeaders({'Content-Type' : 'application/json'})
    private url = "http://10.130.153.138:8000/todo_api/"
    initialize() : Observable<ToDo[]>{
        return this.http.get<ToDo[]>(this.url+"todo",{headers : this.httpHeader})
    }

    updateToDo(toDo :ToDo){
        
        this.http.put(this.url+"update_todo", toDo ,{headers: this.httpHeader}).subscribe((data)=>console.log(data),(err)=>console.log(err)
        
        );
    }

    createToDo(toDo : ToDo){
        this.http.post(this.url+"save",toDo,{headers : this.httpHeader}).subscribe();
    }

    updateToDoTask(story : string , userId : string){
        this.http.put(this.url+"updat_todo/"+story+"/"+userId,{headers : this.httpHeader}).subscribe();
    }
}