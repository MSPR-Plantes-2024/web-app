// ajouter-publication.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-publication',
  templateUrl: './ajouter-publication.component.html',
  styleUrls: ['./ajouter-publication.component.css']
})
export class AjouterPublicationComponent {
  nomPlante: string = '';
  description: string = '';
  selectedFile: File | null = null;

  constructor(private router: Router) {}

  ajouterPublication(): void {
    // Logique pour ajouter la publication dans la base de données avec les valeurs saisies
    // et le fichier sélectionné
    if (this.selectedFile) {
      // Envoyer le fichier au serveur
    }

    // Rediriger l'utilisateur vers la page de profil après l'ajout
    this.router.navigate(['/profile']);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
