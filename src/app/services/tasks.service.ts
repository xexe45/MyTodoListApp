import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { UserDbModel } from "../models/userDb.class";
import { TaskModel } from "../models/task.class";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TasksService {
  private url = "https://taxipiura-6208c.firebaseio.com/";

  user = {};
  tasks: any[] = [];
  key = "";

  constructor(private auth: AuthService, private http: HttpClient) {}

  getUser(id: string) {
    const url = `${this.url}users.json?auth=${this.auth.userToken}&orderBy="id"&equalTo="${id}"`;

    return this.http.get(url).pipe(
      map((user: any) => {
        const key = Object.keys(user)[0];
        localStorage.setItem("key", key);
        return user;
      })
    );
  }

  createUser(user: UserDbModel) {
    const url = `${this.url}users.json?auth=${this.auth.userToken}`;
    return this.http.post(url, user);
  }

  createTask(key: string, task: TaskModel) {
    const url = `${this.url}users/${key}/tasks.json?auth=${this.auth.userToken}`;
    return this.http.post(url, task);
  }

  getTasks(key: string, date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthFormated = month.toString().padStart(2, "0");
    const day = date.getDate();
    const dayFormated = day.toString().padStart(2, "0");
    const dateFormat = `${year}-${monthFormated}-${dayFormated}`;
    const urlTasks = `${this.url}users/${key}/tasks.json?auth=${this.auth.userToken}&orderBy="date"&equalTo="${dateFormat}"`;
    this.http.get(urlTasks).subscribe((tasks: any) => {
      this.tasks = [];
      Object.keys(tasks).forEach(index => {
        this.tasks.push(tasks[index]);
      });
      console.log(this.tasks);
    });
  }
}
