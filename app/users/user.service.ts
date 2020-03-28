import { User } from '../models/user.model';
import { OnInit, Injectable } from '@angular/core';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService implements OnInit{

    duplicateIdStatus : boolean = false;
    duplicateEmailStatus : boolean = false;

    constructor(private userRepository : UserRepository){}
    // users : User[] = [ new User("PT0848","VIKRAM", "KUMAR", "VIKRAM.KUMAR","PROJECT TRAINEE", "NONE"),
    // new User("PT084","VIKRAM", "KUMAR", "VIKRAM.KUMAR","PROJECT TRAINEE", "NONE"),
    // new User("PT088","VIKRAM", "KUMAR", "VIKRAM.KUMAR","PROJECT TRAINEE", "NONE"),
    // new User("PT048","VIKRAM", "KUMAR", "VIKRAMng s.KUMAR","PROJECT TRAINEE", "NONE")];
    users: User[] =[];
   

    ngOnInit(){
    }

    initializeData() {

        console.log("getting all data")
        return this.userRepository.getAllUser()     
    }
                    
    addUser(user : User) : void{
        this.users.push(user);
    }

    removeUser(id : string) : void {
        for(var i = 0; i < this.users.length; i++){
            if(this.users[i].userId === id){
                this.users[i].userTeamName = 'NONE'
                console.log(this.users[i]);              
                this.users.splice(i, 1);
                break;
            }
        }
    }

    checkDuplicateUser(userId : string) : boolean {
        for(let i=0; i< this.users.length; i++){
            if(this.users[i].userId === userId){
                this.duplicateIdStatus = true;
                break;
            }
        }
        return this.duplicateIdStatus;
    }

    checkDuplicateEmail(userEmail : string){
        for(let i=0; i< this.users.length; i++){
            if(this.users[i].userEmail === userEmail){
                this.duplicateEmailStatus = true;
                break;
            }
        }
        return this.duplicateEmailStatus;
    }

    
}