import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/authen/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Suma Town';

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.restoreProfile();
    this.accountService.profile.subscribe(profile => {
      this.accountService.saveToLocalStorage(profile);
    });
  }
}
