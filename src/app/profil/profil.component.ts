import { Component, OnInit } from '@angular/core';
import { PublicationCreation } from '../publication/interfaces/publication-creation-interface';
import { PublicationsService } from '../publications.service';
import { UserService } from '../user.service';
import { UserInterface } from '../signup/interfaces/user-interface';
import { User } from '../publication/interfaces/user-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Importer ActivatedRoute

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  publicationsUser?: PublicationCreation[];
  gardiennagesUser?: PublicationCreation[]; // Ajoutez cette propriété pour stocker les gardiennages de l'utilisateur
  userConnectee!: User;

  showModificationForm: boolean = false;

  coordonneesForm: FormGroup;

  constructor(
    private publicationService: PublicationsService,
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute 
  ) {
    this.coordonneesForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
     // Récupérer les données de l'utilisateur à partir de la route si disponibles
     const userData = this.route.snapshot.data['user'];
     if (userData) {
       this.userConnectee = userData;
       this.coordonneesForm.patchValue({
         nom: userData.lastName,
         prenom: userData.firstName,
         email: userData.email,
       });
     } else{
      this.chargerUtilisateur();
      this.chargerPublicationsUtilisateur();
      this.chargerGardiennagesUtilisateur();
     }
   // Appelez la méthode pour charger les gardiennages de l'utilisateur
    
  }

  chargerUtilisateur() {
    this.userService.getUserById(2).subscribe((user) => {
      this.userConnectee = user;
      this.coordonneesForm.patchValue({
        nom: user.lastName,
        prenom: user.firstName,
        email: user.email,
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

    const updatedUser: User = {
      id: this.userConnectee.id,
      firstName: prenom,
      lastName: nom,
      email: email,
      UserTypeDTO: this.userConnectee.UserTypeDTO,
    };

    this.userService.Updateuser(this.userConnectee.id, updatedUser).subscribe(
      (updatedUser) => {
        this.userConnectee = updatedUser;
        this.showModificationForm = false;
      },
      (error) => {
        // Gérer les erreurs ici
      }
    );
  }

  chargerPublicationsUtilisateur() {
    this.publicationService.getPublicationsByUserId(1).subscribe((data) => {
      this.publicationsUser = data;
    });
  }

  supprimerPublication(publicationId: number) {
    this.publicationService
      .supprimerPublicationsById(publicationId)
      .subscribe(() => {
        // Après la suppression réussie, recharger la liste des publications de l'utilisateur
        this.chargerPublicationsUtilisateur();
      });
  }

  // Méthode pour charger les gardiennages de l'utilisateur
  chargerGardiennagesUtilisateur() {
    // Implémentez la logique pour charger les gardiennages de l'utilisateur
    // Vous devez récupérer les publications réservées par l'utilisateur
    // Par exemple, vous pouvez utiliser une méthode dans le service de publication pour récupérer les gardiennages de l'utilisateur
    // Une fois que vous avez récupéré les gardiennages, mettez à jour la propriété gardiennagesUser
    // Par exemple :
    // this.publicationService.getGardiennagesByUserId(this.userConnectee.id).subscribe(data => {
    //   this.gardiennagesUser = data;
    // });
  }
}
