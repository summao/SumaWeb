import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/authen/account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  fg = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signin(): void {
    this.accountService.signin(this.fg.value).subscribe(
      result => {
        console.log(result);
        localStorage.setItem('profile', JSON.stringify(result));
        this.router.navigate(['feed']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
