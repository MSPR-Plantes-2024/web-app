import { Component, OnInit } from '@angular/core';
import { PublicationsService } from '../publications.service'; // Assurez-vous d'importer correctement le service
import { Router } from '@angular/router'; // Importez le Router
import { PublicationCreation } from '../publication/interfaces/publication-creation-interface';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  publications?: PublicationCreation[];
  botanists: any[] = [];
  city: string = ''; // Ajoutez cette propriété pour stocker le code postal saisi

  constructor(private publicationsService: PublicationsService, private router: Router) { } // Injectez le Router

  async ngOnInit() {
    await this.initialiserPublications();
  }

  async initialiserPublications() {
    try {
      this.publications = await this.publicationsService.getPublications().toPromise();
    } catch (error) {
      console.error("Erreur lors de l'initialisation des publications :", error);
    }
  }

  async RechercheparZip() {
    try {
      if (this.city) {
        // Filtrer les publications en fonction du code postal
        this.publications = this.publications?.filter(publication => publication.address.city === this.city);
      } else {
        // Si aucun code postal n'est saisi, réinitialisez la liste des publications
        await this.initialiserPublications();
      }
    } catch (error) {
      console.error("Erreur lors de la recherche des publications par code postal :", error);
    }
  }
  

   goToPublicationDetails(publicationId: number) {
    // Redirige vers la page de détails de la publication avec l'ID de la publication
    this.router.navigate(['/publication', publicationId]);
  }
}
