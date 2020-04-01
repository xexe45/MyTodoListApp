import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TasksService {
  private url = "https://taxipiura-6208c.firebaseio.com/";

  constructor(private auth: AuthService, private http: HttpClient) {}
}
