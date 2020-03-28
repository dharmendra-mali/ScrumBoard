import { User } from './user.model';

export class Tasks{

    // constructor(public userId: string,
    //             public notes: string,
    //             public userName: string){}

    constructor(public taskStatus:string,
                public notes: string
                                    ){}
}