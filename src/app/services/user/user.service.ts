import { AuthResponse } from './../../models/interface/user/auth/AuthResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUpUserResponse } from 'src/app/models/interface/user/SignUpUserResponse';
import { SignUpUserRequest } from 'src/app/models/interface/user/SignupUser';
import { AuthRequest } from 'src/app/models/interface/user/auth/authRequest';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = enviroment.API_URL

  constructor(private http: HttpClient) { }

  signUpUser(requestData: SignUpUserRequest): Observable<SignUpUserResponse>{
    return this.http.post<SignUpUserResponse>(
      `${this.API_URL}/user`,
      requestData
    );
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse>{
     return this.http.post<AuthResponse>(`${this.API_URL}/auth`, requestDatas)
  }
}
