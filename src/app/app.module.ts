import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ProfilComponent } from './profil/profil.component';
import { PublicationsComponent } from './publications/publications.component';
import { PublicationComponent } from './publication/publication.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Importez HTTP_INTERCEPTORS ici
import { AjouterPublicationComponent } from './ajouter-publication/ajouter-publication.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { PublicationsService } from './publications.service';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './auth.interceptor'; // Importez l'intercepteur d'authentification ici

@NgModule({ declarations: [
        AppComponent,
        SigninComponent,
        SignupComponent,
        ProfilComponent,
        PublicationsComponent,
        PublicationComponent,
        AjouterPublicationComponent,
        MessagerieComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule], providers: [
        PublicationsService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Fournissez l'intercepteur ici
        ,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
