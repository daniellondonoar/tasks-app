import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import {TasksComponent} from './components/tasks/tasks.component';
import {SigninComponent} from './components/signin/signin.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/tasks',
    pathMatch:'full'
  },
  {
    path:'tasks',
    component:TasksComponent
  },
  {
    path:'signin',
    component:SigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
