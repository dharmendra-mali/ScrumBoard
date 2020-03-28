import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';
import { Injectable } from '@angular/core';

@Injectable()
export class TeamRepository{

    private url = "http://10.130.153.138:8000/team_api/"
    private httpHeader = new HttpHeaders({'Content-Type':'application/json'})

    constructor(private http : HttpClient) {}

    getAllTeams() : Observable<Team[]> {
        return this.http.get<Team[]>(this.url+"team")
    }

    createTeam(team : Team){
        this.http.post(this.url+"save",JSON.stringify(team), {headers : this.httpHeader}).subscribe();
    }

    deleteTeam(teamName : string) {
        this.http.delete(this.url+"delete/"+teamName).subscribe();
    }

    addTeamUser(team : Team){
        this.http.put(this.url+"addUserToTeam",team, {headers : this.httpHeader}).subscribe();
    }

    delete_user(team : Team){
        this.http.put(this.url+"delete_user",team, {headers : this.httpHeader}).subscribe();
    }
}