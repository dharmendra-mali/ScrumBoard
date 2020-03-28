import { ToDoHelper } from './toDoHelper.model';

export class ToDo {

    constructor(public userId : string,
                public toDoHelper : ToDoHelper[]) {}
}