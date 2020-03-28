import { Tasks } from './tasks.model';
import { Team } from './team.model';

export class Scrum {

    constructor(
        public scrumName :  string,
        public tasks : Tasks [],
        public team : Team) {}
}