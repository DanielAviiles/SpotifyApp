import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Archivo de rutas
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Para peticiones web

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ArtistaComponent } from './pages/artista/artista.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardsComponent } from './components/cards/cards.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AuthserviceInterceptor } from './interceptors/authservice.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtistaComponent,
    NavbarComponent,
    CardsComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthserviceInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
