import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TasksService} from '../../services/tasks.service';
import {UsersService} from '../../services/users.service'; 
import { FormsModule } from '@angular/forms';
import { format } from 'timeago.js';




@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  all_tasks: any = [];
  all_users: any = [];
  titlemd: any;
  

  //date: any = new date();
  //loadonetask: any;
  typeu = localStorage.getItem('idusertype');
  constructor(private TasksService:TasksService, private router:Router, private UsersService:UsersService) { }

  ngOnInit() {
    //var all_tasks;
    this.validationLocalStorage();
    this.alltasks();
    this.allusers();
    //typeu = localStorage.getItem('idusertype');
  }

  
  alltasks(){

    this.TasksService.alltasks().subscribe(
      res => {
        if(res != null ){            
          this.all_tasks = res;
        }else{
          alert('no hay tareas');
        }
        
      },
      err => console.log(err)
    )
  }

  allusers(){

    this.UsersService.allusers().subscribe(
      res => {
        if(res != null ){            
          this.all_users = res;
        }else{
          alert('error carga usuarios');
        }
        
      },
      err => console.log(err)
    )
  }

  loadonetask(id:any){
    //(<HTMLInputElement>document.getElementById("titleedit")).value = 'pruebita';
    //this.titlemd = 'Prueba1';
    
    this.TasksService.loadonetask(id).subscribe(
      res => {
        if(res != null ){            
          //this.loadonetask = res;
          
          //alert(res.idtask);
          (<HTMLInputElement>document.getElementById("idedit")).value = res.idtask;
          
          (<HTMLInputElement>document.getElementById("titleedit")).value = res.title;
          (<HTMLInputElement>document.getElementById("descriptionedit")).value = res.description;

          (<HTMLInputElement>document.getElementById("dateedit")).value = res.date_execution;
          (<HTMLInputElement>document.getElementById("timeedit")).value = res.time_execution;
          (<HTMLInputElement>document.getElementById("stateedit")).value = res.state;
          (<HTMLInputElement>document.getElementById("respedit")).value = res.userResponsible.iduser;
          (<HTMLInputElement>document.getElementById("asigedit")).value = res.userAssigned.username;
          (<HTMLInputElement>document.getElementById("asigedit")).value = res.userAssigned.username;
          
          //alert(((new Date().getTime()) - (new Date(res.date_execution+' '+res.time_execution).getTime()))/(1000*60*60*24));
          /*
          var fecha1 = moment('2016-07-12');
          var fecha2 = moment('2016-08-01');
        
          alert(fecha2.diff(fecha1, 'days'), ' dias de diferencia');
          console.log(new Date().getTime());
          console.log(new Date(res.date_execution).getDay());
          */
        }else{
          alert('error carga usuario');
        }
        
      },
      err => console.log(err)
    )
    
  }

  changestate(id: any, state: string){
    state = (state == '0' ? 'true' : 'false');
    
    this.TasksService.changestate(id, state).subscribe(
      res => {
        if(res != null){
            //alert('cambio realizado');
            location.reload();
        }else{
          alert('cambio no realizado');
        }
      }
    )
  }

/*
  changetask(value:any){
    alert('presionado'+value);
  }*/


  savetask(title: any, description: any, date: any, time:any, state: string, resp: any){
    state = (state == '0' ? 'true' : 'false');
    //alert(title+ description+ date+ time+':00'+ state+ resp+localStorage.getItem('iduser'));
    
    this.TasksService.savetask(title, description, date, time, state, resp).subscribe(
      res => {
        if(res != null){
            //alert('Tarea guardada');
            location.reload();
        }else{
          alert('cambio no realizado');
        }
      }
    )
  }

  modifytask(id: any, title: any, description: any, date: any, time:any, state: string, resp: any){
    
    state = (state == '0' ? 'true' : 'false');
    //alert(id+title+ description+ date+ time+':00'+ state+ resp+localStorage.getItem('iduser'));
    
    this.TasksService.modifytask(id, title, description, date, time, state, resp).subscribe(
      res => {
        if(res != null){
            //alert('Tarea modificada');
            location.reload();
        }else{
          alert('cambio no realizado');
        }
      }
    )
  }

  deletetask(id: any){
    //alert(id);
    this.TasksService.deletetask(id).subscribe(
      res => {
        if(res != null){
            //alert('Tarea eliminada');
            location.reload();
        }else{
          alert('cambio no realizado');
        }
      }
    )
  }

  clearLocalStorage(){
    localStorage.clear();
    this.router.navigate(['signin']);
  }

  validationLocalStorage(){
    if(localStorage.length>0){

    }else{
      this.router.navigate(['signin']);
    }
  }
}
