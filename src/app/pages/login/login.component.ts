import { Component, OnInit } from "@angular/core";
import { UserModel } from "../../models/user.class";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  usuario: UserModel;

  constructor(private auth: AuthService, private router: Router) {
    this.usuario = new UserModel("", "", "");
  }

  ngOnInit(): void {}

  login(forma: NgForm) {
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

    this.auth.login(this.usuario).subscribe(
      data => {
        console.log(data);
        Swal.close();
        this.router.navigate(["/home"]);
      },
      err => {
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
