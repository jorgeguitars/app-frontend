import { Injectable } from '@angular/core';
import { LoginI } from '../../models/login.interface';
import { LoginResponse } from '../../models/response.interface';
import { PostI } from '../../models/listapost.interface';
import { CategoriasI } from '../../models/listacategorias';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostnuevoI } from '../../models/post.interface';
import { PostResponse } from '../../models/post.response.interface';
import { RegistroNuevoI } from '../../models/registro.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
url:string="http://localhost/sistema_registro/api/"



constructor(private http:HttpClient) { }

loginByEmail(form:LoginI):Observable<LoginResponse>{
    let direccion = this.url + "login.php"
    return this.http.post<LoginResponse>(direccion,form)
        }

getAllPosts(): Observable<any> {
  let direccion = this.url + "post.php"
  return this.http.get<PostI[]>(direccion);
 }

getAllCategories(): Observable<any> {
  let direccion = this.url + "categories.php"
  return this.http.get<CategoriasI[]>(direccion);
   }

 // Método para crear un nuevo post
createPost(form: PostnuevoI): Observable<PostResponse> {
 let direccion = this.url + "post.php";
  return this.http.post<PostResponse>(direccion, form, {
  headers: {
   'Content-Type': 'application/json' // Asegúrate de que el contenido sea JSON
    }
   });
  }

  createRegistro(form: RegistroNuevoI): Observable<PostResponse> {
    let direccion = this.url + "register.php";
     return this.http.post<PostResponse>(direccion, form, {
     headers: {
      'Content-Type': 'application/json' // Asegúrate de que el contenido sea JSON
       }
      });
     }


 }
