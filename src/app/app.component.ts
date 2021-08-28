import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/authen/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Suma Town';

  ngOnInit(): void {
    console.log('load profile');
  }
}
