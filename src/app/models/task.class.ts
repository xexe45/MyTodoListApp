export class TaskModel {
  constructor(
    public id: string,
    public text: string,
    public date: Date,
    public status: boolean
  ) {}
}
