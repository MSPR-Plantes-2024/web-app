import { Component } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  user = {
    firstName: 'Hosni',
    lastName: 'Hamdi',
    email: 'Hosnihamdi@example.com',
    publications: [
      { date: '2024-01-01', description: 'Description de la publication 1' },
      { date: '2024-01-02', description: 'Description de la publication 2' },
      // Ajoutez ici d'autres publications de l'utilisateur
    ],
    plantes: [
      { nom: 'Plante 1', description: 'Description de la plante 1', condition: 'Bonne condition' },
      { nom: 'Plante 2', description: 'Description de la plante 2', condition: 'Mauvaise condition' },
      // Ajoutez ici d'autres plantes de l'utilisateur
    ]
  };

  showModificationForm: boolean = false;
  nouveauPrenom: string = '';
  nouveauNom: string = '';
  nouvelEmail: string = '';

  constructor() {
    // Ici, vous pouvez appeler vos API pour récupérer les publications et les plantes de l'utilisateur
    // Assurez-vous que les données sont correctement typées
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
}
