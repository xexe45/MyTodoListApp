import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../models/user.class";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private url = "https://identitytoolkit.googleapis.com/v1/accounts:";
  private apiKey = "AIzaSyBD_Oyc_aIlrjBjzYalR8xL_Xe2QKEd7jY";
  userToken: string;

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem("token");
  }

  login(usuario: UserModel) {
    const url = `${this.url}signInWithPassword?key=${this.apiKey}`;
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(url, authData).pipe(
      map(resp => {
        console.log("Entro en el mapa del rxjs");
        this.guardarToken(resp["idToken"]);
        return resp;
      })
    );
  }

  nuevoUsuario(usuario: UserModel) {
    const url = `${this.url}signUp?key=${this.apiKey}`;
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(url, authData).pipe(
      map(resp => {
        this.guardarToken(resp["idToken"]);
        return resp;
      })
    );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem("token", idToken);

    const hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem("expira", hoy.getTime().toString());
  }

  private leerToken() {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    } else {
      this.userToken = "";
    }

    return this.userToken;
  }

  isAuthenticated(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem("expira"));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
