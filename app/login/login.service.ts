import { BehaviorSubject, Subject } from 'rxjs';

export class LoginService{
    dispalayLogout:Subject<boolean> = new BehaviorSubject<boolean>(false);
   get logOut$(){
        return this.dispalayLogout.asObservable();
    }
    
    adddispalayLogout( dispalayLogout:boolean){
        this.dispalayLogout.next(dispalayLogout);
    }
}