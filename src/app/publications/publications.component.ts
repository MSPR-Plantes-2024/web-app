import { Component, OnInit } from '@angular/core';
import { PublicationsService } from '../publications.service';
import { Router } from '@angular/router';
import { PublicationCreation } from '../publication/interfaces/publication-creation-interface';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
})
export class PublicationsComponent implements OnInit {
  publications?: PublicationCreation[];
  botanists: any[] = [];
  city: string = '';
  publicationsToReserve: PublicationCreation[] = []; // Liste des publications à réserver

  constructor(
    private publicationsService: PublicationsService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.initialiserPublications();
  }

  async initialiserPublications() {
    try {
      // Récupérer toutes les publications
      const allPublications = await this.publicationsService.getPublications().toPromise();
      // Vérifier si allPublications n'est pas undefined
      if (allPublications) {
        // Filtrer les publications dont l'ID du créateur est différent de 1
        this.publications = allPublications.filter(publication => publication.publisherId !== 1);
      }
    } catch (error) {
      console.error("Erreur lors de l'initialisation des publications :", error);
    }
  }
  

  async RechercheparZip() {
    try {
      if (this.city) {
        this.publications = this.publications?.filter(
          (publication) => publication.address.city === this.city
        );
      } else {
        await this.initialiserPublications();
      }
    } catch (error) {
      console.error(
        'Erreur lors de la recherche des publications par code postal :',
        error
      );
    }
  }

  // Méthode pour vérifier si la publication appartient à l'utilisateur actuel
  isUserPublication(publication: PublicationCreation): boolean {
    // Vous devrez obtenir l'ID de l'utilisateur connecté, par exemple à partir du service UserService
    const currentUserID = 2; // Modifier pour obtenir l'ID de l'utilisateur connecté
    return publication.publisherId === currentUserID;
  }

  // Méthode pour réserver une publication
  reservePublication(publication: PublicationCreation): void {
    // Ajouter la publication à la liste des publications à réserver
    this.publicationsToReserve.push(publication);
    // Vous pouvez ajouter ici la logique supplémentaire pour la réservation, par exemple rediriger vers une page de confirmation
  }

  // Méthode pour afficher les détails d'une publication
  goToPublicationDetails(publicationId: number) {
    this.router.navigate(['/publication', publicationId]);
  }
}
