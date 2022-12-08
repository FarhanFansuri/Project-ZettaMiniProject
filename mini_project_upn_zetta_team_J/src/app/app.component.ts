import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mini_project_upn_zetta_team_J';
  login: boolean = true;
  cart: boolean = true;


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (localStorage.getItem("token")) {
      this.login = false;
    } else {
      this.login = true;
    }
  }

}

