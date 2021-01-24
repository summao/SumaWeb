import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  signup() {
    this.http.post(`${environment.sumaAuthenUrl}/signup`, this.fg.value).subscribe(
      result => {
        console.log(result);

      },
      error => console.log(error)
    );
  }

}
