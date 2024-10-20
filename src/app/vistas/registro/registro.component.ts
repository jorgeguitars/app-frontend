import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../servicios/api/api.service'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router';
import { RegistroNuevoI } from '../../models/registro.interface'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;

  constructor(private api: ApiService, private router: Router) {
    // Inicializa el FormGroup con validaciones
    this.registroForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]) // Ajusta la longitud mínima según tus necesidades
    });
  }

  ngOnInit(): void {
    // Aquí puedes realizar cualquier acción adicional que necesites al iniciar el componente
  }

  // Método para enviar el formulario
  postRegistro(form: RegistroNuevoI) {
    this.api.createRegistro(form).subscribe(data => {
      console.log('Usuario creado exitosamente:', data);
      this.router.navigate(['/login']); // Redirecciona al dashboard
  },
  error => {
      console.error('Error al crear el post:', error);
  });

  }
}
