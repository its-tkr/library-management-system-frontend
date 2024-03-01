import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private api: ApiService,private authService: AuthService,private router:Router) { }
  public profileForm=new FormGroup({
    userEmail:new FormControl(),
    userName:new FormControl(),
    newPassword:new FormControl(),
    confirmPassword:new FormControl(),
  });

  public loginForm = new FormGroup({
    userPassword: new FormControl()
  });

  public validPassword!: boolean;
  public err!: any;
  public showpasswordChange!: boolean;
  ngOnInit(): void {
    this.validPassword = false;
    this.api.getUser().subscribe((user:any)=>{
      this.profileForm.setValue({
        userEmail:user.userEmail,
        userName:user.userName,
        newPassword:null,
        confirmPassword:null,
      });
    })
  }
  submit(): void {

    if(this.profileForm.valid){

      if(this.showpasswordChange){

        var user={
          userEmail:this.profileForm.value.userEmail,
          userPassword:this.profileForm.value.confirmPassword,
          userName:this.profileForm.value.userName,
          isAdmin:this.authService.isAdmin
        }
        this.api.updateUser(user).subscribe((data:any)=>{
          console.log(data);
        },(err:any)=>{
          console.log(err);
        })
      }
      else{
        var user={
          userEmail:this.profileForm.value.userEmail,
          userPassword:this.loginForm.value.userPassword,
          userName:this.profileForm.value.userName,
          isAdmin:this.authService.isAdmin
        }
        this.api.updateUser(user).subscribe((data:any)=>{
        },(err:any)=>{
          console.log(err);
        })
      }
      this.router.navigate(['/home']);
    }
    else{
      console.log("Invalid Form");
    }
    
  }

  checkPassword(): void {
    this.api.checkPassword({ userPassword: this.loginForm.value.userPassword }).subscribe((data: any) => {
      this.validPassword = data;
      if (data) {

      }
      else {
        this.err = "Password Doesnot Match";
      }
    }, (err: any) => {
      console.log(err);
    });
  }

  toggleChangePassword(e:any):any{
    e.checked ? this.showpasswordChange=true:this.showpasswordChange=false;
  }
}
