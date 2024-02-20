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
import { HttpClientModule } from '@angular/common/http';
import { AjouterPublicationComponent } from './ajouter-publication/ajouter-publication.component';
import { MessagerieComponent } from './messagerie/messagerie.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ProfilComponent,
    PublicationsComponent,
    PublicationComponent,
    AjouterPublicationComponent,
    MessagerieComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
