import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';
import { PostI } from '../../models/listapost.interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  posts: PostI[] = []; // Inicializa posts como un arreglo vacío

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(): void {
    this.api.getAllPosts().subscribe(data => {
      console.log(data); // Imprime los datos en la consola para verificar
      this.posts = data; // Asigna los datos a la variable posts
    }, error => {
      console.error('Error al obtener publicaciones', error); // Manejo de errores
    });
  }

}

