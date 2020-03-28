import { User } from 'src/app/models/user.model';
import { Team } from 'src/app/models/team.model';

export class TeamService{

    sendDuplicateTeamsStatus : boolean = false;
    //users : User[] = []; 
    // [ new User("PT848","VIKRAM",'KUMAR','VIKRAM.KUMAR','SOFTWARE ENGINNER','TEAM-I'),
    //                   new User("PT748","VIKRAM",'KUMAR','VIKRAM.KUMAR','SOFTWARE ENGINNER','TEAM-I'),
    //                   new User("PT048","VIKRAM",'KUMAR','VIKRAM.KUMAR','SOFTWARE ENGINNER','TEAM-I')];
    
    teams : Team[] = [];
    // [new Team("team1", this.users),
    //                   new Team("team2", this.users) ];


    createTeam(team : Team){
        this.teams.push(team);
    }

    checkDuplicateTeam(teamName : string) : boolean{
        for(let i = 0; i< this.teams.length ; i++){
            if(this.teams[i].teamName === teamName){
                this.sendDuplicateTeamsStatus = true;
            }
        }
        return this.sendDuplicateTeamsStatus;
    }

    removeTeam(teamName : string){
        for( let i=0; i<this.teams.length; i++){
            if(this.teams[i].teamName == teamName){
                for(let j=0; j<this.teams[i].teamUsers.length ; j++){
                    this.teams[i].teamUsers[j].userTeamName='NONE';
                }
                this.teams.splice(i, 1);
                break;
            }
        }
    }
}