import { Injectable } from '@angular/core';
import { LoginI } from '../../models/login.interface';
import { LoginResponse } from '../../models/response.interface';
import { PostI } from '../../models/listapost.interface';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
url:string="http://localhost/sistema_registro/api/"
apiUrl:string = 'http://localhost/sistema_registro/api/post.php';

constructor(private http:HttpClient) { }

loginByEmail(form:LoginI):Observable<LoginResponse>{
    let direccion = this.url + "login.php"
    return this.http.post<LoginResponse>(direccion,form)
        }


        getAllPosts(): Observable<any> {
             let direccion = this.url + "post.php"
             return this.http.get<PostI[]>(direccion);
         }
    }
