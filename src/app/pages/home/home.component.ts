import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  checked = true;
  nochecked = false;
  disabled = true;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.router.navigateByUrl("/login");
  }
}
