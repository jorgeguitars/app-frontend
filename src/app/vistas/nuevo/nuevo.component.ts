import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostnuevoI } from '../../models/post.interface';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';
import { CategoriasI } from '../../models/listacategorias';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  nuevoForm: FormGroup;
  categorias: CategoriasI[] = [];

  constructor(private api: ApiService, private router: Router) {
    // Inicializa el FormGroup con un valor por defecto para cada control
    this.nuevoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      category_id: new FormControl('', Validators.required),
      userid: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.checkLocalStorage();

    // Obtener categorías al inicializar el componente
    this.loadCategories();
    const userid = localStorage.getItem('userid');
    console.log('userid en localStorage:', userid); // Agregar log para verificar el valor
    if (userid) {
      this.nuevoForm.patchValue({
        userid: Number(userid)
      });
    } else {
      console.error('No se encontró userid en la sesión');
      alert('Debes iniciar sesión para crear un post.'); // Mensaje al usuario
      this.router.navigate(['/login']);
    }
  }

  checkLocalStorage() {
    const userid = localStorage.getItem('userid');

    if (userid) {
      this.router.navigate(['nuevo']);
    }
  }

  loadCategories(): void {
    this.api.getAllCategories().subscribe(
      data => {
        this.categorias = data;
        console.log("Categorías:", this.categorias);
      },
      error => {
        console.error('Error al obtener categorías', error);
      }
    );
  }


postForm(form: PostnuevoI) {
  this.api.createPost(form).subscribe(data => {
      console.log('Post creado exitosamente:', data);
      this.router.navigate(['/dashboard']); // Redirecciona al dashboard
  },
  error => {
      console.error('Error al crear el post:', error);
  });

  }

}
