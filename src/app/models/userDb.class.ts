import { TaskModel } from "./task.class";
export class UserDbModel {
  constructor(
    public id: string,
    public name: string,
    public tasks: TaskModel[]
  ) {}
}
