import { Scrum } from 'src/app/models/scrum.model';
import { Tasks } from 'src/app/models/tasks.model';
import { User } from 'src/app/models/user.model';
import { Team } from 'src/app/models/team.model';

export class ScrumService{

    
    user = new User("NONE","NONE","","","","","");
    team = new Team("NONE",[this.user]);
    tasks : Tasks []   = [new Tasks('NONE','NONE'),
                          new Tasks('NONE','GOT',)];
    scrum : Scrum[] = [ new Scrum("TEST",this.tasks,this.team),
                        new Scrum("TEST2",this.tasks, this.team)];;
    duplicate = false;

    pushToScrum(scrum : Scrum) : void {
        this.scrum.push(scrum);
    }

    reamoveScrum(scrumName : string){
        for(let i=0; i<this.scrum.length; i++){
            if(this.scrum[i].scrumName === scrumName){
              this.scrum.splice(i , 1);
              break;
            }
          }
    }

    validateDuplicate(scrumName : string) : boolean{
        this.scrum.forEach((scrum : Scrum) => {
             if( scrum.scrumName === scrumName ){
                 this.duplicate = true;
             }
            })
        return this.duplicate;
    }

    removeScrumStory(story : string, scrumName : string){

        for(let i=0; i< this.scrum.length ; i++){
            if(this.scrum[i].scrumName === scrumName){
                for(let j=0; j<this.scrum[i].tasks.length; j++){
                    if(this.scrum[i].tasks[j].notes === story){
                        this.scrum[i].tasks.splice(j , 1);
                    }
                }
            }
        }

    }
}