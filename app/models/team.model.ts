import { User } from './user.model';

export class Team{

    constructor(public teamName : string,
                public teamUsers : User []) {}
}