import { Component, OnInit } from '@angular/core';
import { PublicationCreation } from '../publication/interfaces/publication-creation-interface';
import { PublicationsService } from '../publications.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  publicationsUser?: PublicationCreation[];

  showModificationForm: boolean = false;
  nouveauPrenom: string = '';
  nouveauNom: string = '';
  nouvelEmail: string = '';

  constructor(private publicationService: PublicationsService) {
    // Ici, vous pouvez appeler vos API pour récupérer les publications et les plantes de l'utilisateur
    // Assurez-vous que les données sont correctement typées
  }
  
  ngOnInit(): void {
    this.chargerPublicationsUtilisateur();
  }

  chargerPublicationsUtilisateur() {
    this.publicationService.getPublicationsByUserId(1).subscribe(data => {
      this.publicationsUser = data;
    });
  }

  modifierCoordonnees() {
    this.showModificationForm = true;
  }

  enregistrerCoordonnees() {
    // Logique pour enregistrer les coordonnées modifiées
    console.log('Nouveau prénom :', this.nouveauPrenom);
    console.log('Nouveau nom :', this.nouveauNom);
    console.log('Nouvel email :', this.nouvelEmail);

    // Vous pouvez appeler ici votre API pour enregistrer les modifications dans la base de données
    // Réinitialiser les champs après l'enregistrement
    this.nouveauPrenom = '';
    this.nouveauNom = '';
    this.nouvelEmail = '';
    // Cacher le formulaire de modification
    this.showModificationForm = false;
  }

  supprimerPublication(publicationId: number) {
    this.publicationService.supprimerPublicationsById(publicationId).subscribe(() => {
      // Après la suppression réussie, recharger la liste des publications de l'utilisateur
      this.chargerPublicationsUtilisateur();
    });
  }
}
