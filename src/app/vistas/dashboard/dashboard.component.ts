import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';
import { PostI } from '../../models/listapost.interface';
import { CategoriasI } from '../../models/listacategorias';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: PostI[] = [];
  categorias: CategoriasI[] = [];
  filteredPosts: PostI[] = [];
  selectedCategory: string = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.checkSession(); // Verifica la sesión al inicializar

    this.api.getAllPosts().subscribe(data => {
      this.posts = data;
      this.filteredPosts = data; // Inicialmente muestra todos los posts
      console.log("Publicaciones:", this.posts);
    }, error => {
      console.error('Error al obtener publicaciones', error);
    });

    this.api.getAllCategories().subscribe(data => {
      this.categorias = data;
      console.log("Categorías:", this.categorias);
    }, error => {
      console.error('Error al obtener categorías', error);
    });
  }

  checkSession() {
    const userid = localStorage.getItem('userid');

    if (!userid) {
      console.error('No se encontró userid en localStorage');
      alert('Debes iniciar sesión para acceder al dashboard.'); // Mensaje al usuario
      this.router.navigate(['/login']); // Cambia la ruta según tu aplicación
    }
  }

  filterPosts(): void {
    const selectedCategory = (document.getElementById('categoryFilter') as HTMLSelectElement).value;
    this.selectedCategory = selectedCategory;
    const selectedCategoryId = selectedCategory ? Number(selectedCategory) : null;

    this.filteredPosts = this.posts.filter(post =>
      selectedCategoryId ? post.categoryid === selectedCategoryId : true
    );
  }
}
