import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ProfilComponent } from './profil/profil.component';
import { PublicationsComponent } from './publications/publications.component';
import { PublicationComponent } from './publication/publication.component';
import { AjouterPublicationComponent } from './ajouter-publication/ajouter-publication.component';
import { MessagerieComponent } from './messagerie/messagerie.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'profile', component: ProfilComponent },
  { path: 'publications', component: PublicationsComponent},
  { path: 'publication', component: PublicationComponent},
  { path: 'ajouterpublication', component: AjouterPublicationComponent},
  { path: 'messagerie', component: MessagerieComponent},


  

  { path: '', redirectTo: '/signin', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
