import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/authen/account.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  email = new FormControl('', [ Validators.required, Validators.maxLength(100), Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);
  profileName = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  username = new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-z][a-z_\d]*[a-z1-9]$/)]);
  month = new FormControl('', [Validators.required]);
  day = new FormControl('', [Validators.required]);
  year = new FormControl('', [Validators.required]);

  fg = new FormGroup({
    email: this.email,
    password: this.password,
    profileName: this.profileName,
    username: this.username,
    month: this.month,
    day: this.day,
    year: this.year,
  });

  days: number[] = [];
  years: number[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
    }

    for (let i = 1990; i <= new Date().getFullYear(); i++) {
      this.years.push(i);
    }
  }

  onSubmit(): void {
    this.accountService.signup(this.fg.value).subscribe(
      result => {
        console.log(result);
        // this.router.navigate(['news-feed']);
      },
      error => console.log(error)
    );
  }

}
