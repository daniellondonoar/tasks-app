import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private URL = 'http://localhost:8080/tasks';
  //private URL = 'http://192.168.0.110:8080/tasks';

  constructor(private http: HttpClient) { }

  alltasks() {
    var idusertype = localStorage.getItem('idusertype');
    var iduser = localStorage.getItem('iduser');
    console.log(iduser,idusertype+'++');
    var endpoint_var = (idusertype == '1' ? '/listar' : '/getDataByUser/');
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    });
    if(idusertype == '1'){
      return this.http.get<any>(this.URL + endpoint_var, {headers:headers});
    }else{
      return this.http.post<any>(this.URL + endpoint_var, {iduser : iduser})
    }
  }

  loadonetask(id:any) {
    return this.http.get<any>(this.URL + '/getOne/'+id)
  }

  changestate(id: any, state: string){
    return this.http.put<any>(this.URL + '/cambiarestado/'+id, {state:state});
  }

  savetask(title: any, description: any, date: any, time:any, state: string, resp: any){
    return this.http.post<any>(this.URL + '/save', {
      title: title, 
      description: description, 
      date_execution: date, 
      time_execution: time+':00', 
      state:state, 
      userResponsible: {iduser:resp}, 
      userAssigned: {iduser:localStorage.getItem('iduser')}});
  }

  modifytask(id: any, title: any, description: any, date: any, time:any, state: string, resp: any){
    //var userAssigned_aux = (idusertype == '1' ? '/listar' : '/getDataByUser/');
    return this.http.put<any>(this.URL + '/editar/'+id, {
      title: title, 
      description: description, 
      date_execution: date, 
      time_execution: time+':00', 
      state:state, 
      userResponsible: {iduser:resp}, 
      userAssigned: {iduser:localStorage.getItem('iduser')}});
  }

  deletetask(id: any){
    return this.http.delete<any>(this.URL + '/delete/'+id);
  }


  validateroll() {
      var rol = localStorage.getItem('idusertype');
      
  }
}