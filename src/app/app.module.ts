import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './vistas/registro/registro.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';

import { ReactiveFormsModule, FormsModule} from '@angular/forms';
//import { HttpClientModule} from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HeaderComponent,
    FooterComponent,
    routingComponents,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
   // HttpClientModule
  ],
  providers: [
    provideHttpClient() // Proveer HttpClient en lugar de HttpClientModul
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
