import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/authen/account.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  fg = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    profileName: new FormControl(''),
    username: new FormControl(''),
    month: new FormControl(''),
    day: new FormControl(''),
    year: new FormControl(''),
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

  signup(): void {
    this.accountService.signup(this.fg.value).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['post']);
      },
      error => console.log(error)
    );
  }

}
