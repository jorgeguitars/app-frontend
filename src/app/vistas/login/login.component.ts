import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';
import { LoginI } from '../../models/login.interface';
import { LoginResponse } from '../../models/response.interface';

import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Asegúrate de usar styleUrls
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;  // Declaración del formulario como una propiedad de clase

  constructor(private api: ApiService , private router:Router) {
    // Inicializar el formulario en el constructor
    this.loginForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  errorStatus:boolean = false;
  errorMsj:any="";

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    const userName = localStorage.getItem('userName');

    if (userName) {
      this.router.navigate(['dashboard']);
    }
  }

  onLogin() {
    const formValue: LoginI = {
      email: this.loginForm.get('usuario')?.value || null,
      password: this.loginForm.get('password')?.value || null,
    };

    this.api.loginByEmail(formValue).subscribe(
      (data: LoginResponse) => {
        console.log(data);
        // Verificar si el inicio de sesión fue exitoso
        if (data.user && data.user.success) {


        localStorage.setItem('userName', data.user.name);
          // Redirigir al dashboard
          this.router.navigate(['/dashboard']);
        } else {
          // Manejar error de inicio de sesión
          this.errorStatus = true;  // Establecer estado de error
          this.errorMsj = data.message; // Guardar mensaje de error
        }
      },
      error => {
        console.error('Error en el inicio de sesión:', error);
        this.errorStatus = true;  // Establecer estado de error
        this.errorMsj = "Ocurrió un error al intentar iniciar sesión"; // Mensaje de error general
      }
    );
  }
}
