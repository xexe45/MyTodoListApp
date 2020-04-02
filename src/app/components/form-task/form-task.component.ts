import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";
import { TaskModel } from "../../models/task.class";
import { TasksService } from "../../services/tasks.service";

@Component({
  selector: "app-form-task",
  templateUrl: "./form-task.component.html",
  styleUrls: ["./form-task.component.scss"]
})
export class FormTaskComponent implements OnInit {
  @Input() task: any = {
    date: new Date(),
    status: false
  };
  key: string;
  constructor(private router: Router, private taskService: TasksService) {
    this.key = localStorage.getItem("key");
  }

  ngOnInit(): void {}

  regresar() {
    this.router.navigateByUrl("/home");
  }

  guardar(forma: NgForm) {
    if (forma.invalid) {
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      });

      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      text: "Espere porfavor..."
    });

    Swal.showLoading();

    const year = this.task.date.getFullYear();
    const month = this.task.date.getMonth() + 1;
    const monthFormated = month.toString().padStart(2, "0");
    const day = this.task.date.getDate();
    const dayFormated = day.toString().padStart(2, "0");
    const dateFormat = `${year}-${monthFormated}-${dayFormated}`;

    const task = new TaskModel(this.task.text, dateFormat, this.task.status);

    this.taskService.createTask(this.key, task).subscribe(
      (resp: any) => {
        console.log(resp);
        Swal.close();
        this.router.navigate(["/home"]);
      },
      err => {
        console.log(err.error.error.message);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: err.error.error.message
        });
      }
    );
  }
}
