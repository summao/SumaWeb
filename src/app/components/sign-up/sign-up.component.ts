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
  });

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void { }

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
