import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../../services/auth.service";
import { UserModel } from "../../models/user.class";
import { TasksService } from "../../services/tasks.service";
import { UserDbModel } from "../../models/userDb.class";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private tasks: TasksService
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {}

  crearFormulario() {
    // [valor, validaciones sincronas, validaciones asincronas]
    this.forma = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
        ]
      ],

      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  registro() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(cntrol =>
            cntrol.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      text: "Espere porfavor..."
    });

    Swal.showLoading();

    const user = new UserModel(
      this.forma.value.name,
      this.forma.value.email,
      this.forma.value.password
    );

    this.auth.nuevoUsuario(user).subscribe(
      data => {
        console.log(data);
        const userDB = new UserDbModel(data["localId"], user.name, []);
        this.tasks.createUser(userDB).subscribe(r => {
          Swal.close();
          localStorage.setItem("key", r["name"]);
          this.router.navigate(["/home"]);
        });
      },
      (err: any) => {
        console.log(err.error.error.message);
        Swal.fire({
          title: "Error al autenticar",
          icon: "error",
          text: err.error.error.message
        });
      }
    );
  }
}
