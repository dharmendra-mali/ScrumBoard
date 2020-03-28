
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';

 @Injectable()
export class UserRepository{

    private url = "http://10.130.153.138:8000/user_api/";
    private httpHeader = new HttpHeaders({'Content-Type' : 'application/json'})
    constructor(private http : HttpClient) {}

    createUser(user) : void {
        
        this.http.post(this.url+"save", JSON.stringify(user), {headers : this.httpHeader}).subscribe();
    }

    getAllUser() : Observable<User[]>{
        return this.http.get<User[]>(this.url+"user",{headers : this.httpHeader});
    }

    deleteUser(userId : string) : void{
        this.http.delete(this.url+"delete/"+userId,{headers : this.httpHeader}).subscribe();
    }

    validateUser(user : User) : Observable<User>{
        return this.http.post<User>(this.url+"validateUser", user, {headers : this.httpHeader});
    }
}