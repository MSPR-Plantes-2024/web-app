import { Component, OnInit } from '@angular/core';
import { PublicationCreation } from '../publication/interfaces/publication-creation-interface';
import { PublicationsService } from '../publications.service';
import { UserService } from '../user.service';
import { UserInterface } from '../signup/interfaces/user-interface';
import { User } from '../publication/interfaces/user-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  publicationsUser?: PublicationCreation[];
  userConnectee!: User;

  showModificationForm: boolean = false;

  coordonneesForm: FormGroup;

  constructor(private publicationService: PublicationsService, private userService: UserService, private fb: FormBuilder) {
    this.coordonneesForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  
 ngOnInit() {
    this.chargerUtilisateur();
    this.chargerPublicationsUtilisateur();
  }

chargerUtilisateur() {
    this.userService.getUserById(2).subscribe(user => {
      this.userConnectee = user;
      this.coordonneesForm.patchValue({
        nom: user.lastName,
        prenom: user.firstName,
        email: user.email
      });
    });    
  }

  modifierCoordonnees() {
    this.showModificationForm = true;
  }

  enregistrerCoordonnees() {
    if (this.coordonneesForm.invalid) {
      return;
    }

    const nom = this.coordonneesForm.get('nom')?.value;
    const prenom = this.coordonneesForm.get('prenom')?.value;
    const email = this.coordonneesForm.get('email')?.value;

    const updatedUser = new UserInterface()
     updatedUser.firstName = this.userConnectee.firstName,
    updatedUser.lastName = this.userConnectee.lastName,
    updatedUser.email = this.userConnectee.email,
      
    

    this.userService.Updateuser(this.userConnectee.id, updatedUser).subscribe(updatedUser => {
      this.userConnectee = updatedUser;
      this.showModificationForm = false;
    }, error => {
      // Gérer les erreurs ici
    });
  }
  chargerPublicationsUtilisateur() {
    this.publicationService.getPublicationsByUserId(1).subscribe(data => {
      this.publicationsUser = data;
    });    
  }
  supprimerPublication(publicationId: number) {
    this.publicationService.supprimerPublicationsById(publicationId).subscribe(() => {
      // Après la suppression réussie, recharger la liste des publications de l'utilisateur
      this.chargerPublicationsUtilisateur();
    });
  }
}
