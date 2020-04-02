import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TasksService } from "../../services/tasks.service";

@Component({
  selector: "app-task-edit",
  templateUrl: "./task-edit.component.html",
  styleUrls: ["./task-edit.component.scss"]
})
export class TaskEditComponent implements OnInit {
  id: string;
  task: any = {};
  constructor(
    private activatedRouter: ActivatedRoute,
    private taskService: TasksService
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      const id = params["id"];
      this.id = id;
      const key = localStorage.getItem("key");
      this.taskService.getTask(key, id).subscribe((task: any) => {
        console.log(task);
        task.date = new Date(`${task.date}T12:00:00Z`);
        this.task = task;
      });
    });
  }
}
