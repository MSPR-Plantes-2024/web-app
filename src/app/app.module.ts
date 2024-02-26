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
import { PublicationsService } from './publications.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
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
    HttpClientModule,
    RouterModule
  ],
  providers: [PublicationsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
