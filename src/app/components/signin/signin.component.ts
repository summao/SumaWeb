import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AccountService } from 'src/app/services/authen/account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  fg = new FormGroup({
    email: new FormControl('user@example.com'),
    password: new FormControl('1234'),
  });

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signin(): void {
    this.accountService.signin(this.fg.value).subscribe({
      next: () => {
        this.router.navigate(['news-feed']);
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
