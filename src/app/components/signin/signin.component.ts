import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service'; 
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = {
    username: '',
    password: ''
  }

  constructor(private UsersService: UsersService, private router:Router) { }

  ngOnInit() {
  }


  signIn(){
    //console.log(this.user);
    //const md5 = new Md5;

    //this.user.password = md5.appendStr(this.user.password).end();
    //
    this.UsersService.signIn(this.user).subscribe(
      res => {
        console.log(res)
        if(res != null ){
          localStorage.setItem('idusertype',res.idusertype);
          localStorage.setItem('name',res.name);
          localStorage.setItem('iduser',res.iduser);
          this.router.navigate(['tasks']);
        }else{
          alert('usuario incorrecto');
        }
        
      },
      err => console.log(err)
    )
  }
}
