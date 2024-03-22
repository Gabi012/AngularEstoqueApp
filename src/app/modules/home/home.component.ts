import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

import { SignUpUserRequest } from 'src/app/models/interface/user/SignUpUserRequest';
import { AuthRequest } from 'src/app/models/interface/user/auth/AuthRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signupForm = this.formBuilder.group({
    name : ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private cookieService: CookieService,
    private messageService: MessageService, private router: Router ){}

  onSubmitLoginForm(): void{
    console.log("submit", this.loginForm.value);
    if(this.loginForm.valid && this.loginForm.value)
    {
      this.userService.authUser(this.loginForm.value as AuthRequest).subscribe({
        next: (respose) =>
        {
          if(respose){
              this.cookieService.set('USER_INFO', respose?.token);
              this.loginForm.reset();

              this.router.navigate(['/dashboard']);

              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Bem vindo de volta ${respose.name}!`,
                life: 2000
              })
          }
        },
        error: (err) => {

          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao logar',
            life: 2000
          })
          console.log("erro", err);
        }

      });
    }


  }
  onSubmitSignUpForm(): void{
    if(this.signupForm.valid && this.signupForm.value)
    {
      this.userService
      .signUpUser(this.signupForm.value as SignUpUserRequest)
      .subscribe({
        next:(response)=>{
        if(response) {

          this.signupForm.reset();
          this.loginCard = true;
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuário criado!',
            life: 2000
          })
        }
      },
      error: (err)=>{
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao criar usuário.',
          life: 2000
        })
        console.log("erro", err);
      }

    });


  }

}
}
