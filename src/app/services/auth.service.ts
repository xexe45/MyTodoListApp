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
  key: string;

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("key");
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

  updateProfile(idToken: string, name: string) {
    const url = `${this.url}update?key=${this.apiKey}`;
    const profileData = {
      idToken,
      displayName: name,
      photoUrl: "",
      returnSecureToken: true
    };

    return this.http.post(url, profileData);
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

  leerKey() {
    if (localStorage.getItem("key")) {
      this.userToken = localStorage.getItem("key");
    } else {
      this.key = "";
    }
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
