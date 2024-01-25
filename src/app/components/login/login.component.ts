import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private api: ApiService
  ) { }

  public loginForm!: FormGroup;
  public msg!: string;
  public returnUrl!: string;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userEmail: new FormControl(),
      userPassword: new FormControl(),
    });

    this.returnUrl = '/home';
    this.authService.logout();
  }
  get f() {
    return this.loginForm.controls;
  }
  login(): void {
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService.login(this.loginForm.value.userEmail, this.loginForm.value.userPassword).subscribe(
        (data: any) => {
          data.isAdmin
            ? (this.authService.isAdmin = true)
            : (this.authService.isUser = true);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', data.token);
          this.router.navigate([this.returnUrl]);

        },
        (err: any) => {
          this.msg = err.error;
          console.log(err);
        }
      );
    }
  }
}
