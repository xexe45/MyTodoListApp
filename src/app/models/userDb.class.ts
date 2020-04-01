import { TaskModel } from "./task.class";
export class UserDbModel {
  constructor(
    public id: string,
    public uid: string,
    public tasks: TaskModel[]
  ) {}
}
