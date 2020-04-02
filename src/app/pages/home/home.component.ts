import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { TasksService } from "../../services/tasks.service";
import { TaskModel } from "../../models/task.class";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  checked = true;
  nochecked = false;
  disabled = true;
  date: Date;
  key: string;
  months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];
  days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado"
  ];
  constructor(
    private router: Router,
    private auth: AuthService,
    public tasks: TasksService
  ) {
    this.date = new Date();
    this.key = localStorage.getItem("key");
  }

  ngOnInit(): void {
    this.tasks.getTasks(this.key, this.date);
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }

  createTask() {
    this.router.navigateByUrl("/tasks/create");
  }

  cambiar(e) {
    console.log(this.date);
    this.tasks.getTasks(this.key, this.date);
  }

  seleccionar(task: any) {
    const updateTask = new TaskModel(task.text, task.date, task.status);
    this.tasks
      .updateTask(this.key, task.id, updateTask)
      .subscribe((resp: any) => {
        console.log(resp);
      });
  }

  editar(id: string) {
    this.router.navigate(["tasks", id, "edit"]);
  }
}
