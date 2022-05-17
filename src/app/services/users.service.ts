import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import axios, { Axios } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private URL = 'http://localhost:8080/users';
  /*private URL = 'http://192.168.0.110:8080/users';
*/

  constructor(private http: HttpClient) { }

  signIn(user: { username: string; password: string; }) {
  const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    });
    //return this.http.post<any>(this.URL + '/signin', user, {headers:headers});
    return this.http.post<any>(this.URL + '/signin', user, {headers:headers});
    //return await axios.post(this.URL+'signin',user);
  }

  allusers() {
    return this.http.get<any>(this.URL + '/listar')
  }
}
