import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { RegistroComponent } from './vistas/registro/registro.component';
import { PostsComponent} from './vistas/posts/posts.component';


const routes: Routes = [
  { path:'', redirectTo:'login' , pathMatch:'full'},
  { path:'login' , component:LoginComponent},
  { path:'dashboard' , component:DashboardComponent},
  { path:'registro' , component:RegistroComponent},
  { path:'post' , component:PostsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =[LoginComponent,DashboardComponent,RegistroComponent,PostsComponent]
