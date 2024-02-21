import { Component, OnInit } from '@angular/core';
import { PublicationsService } from '../publications.service'; // Assurez-vous d'importer correctement le service
import { Router } from '@angular/router'; // Importez le Router

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  publications: any[] = [];
  botanists: any[] = [];

  constructor(private publicationsService: PublicationsService, private router: Router) { } // Injectez le Router

  ngOnInit() {
    this.publicationsService.getPublications().subscribe((data: any[]) => { 
      this.publications = data;
    });
  }

   goToPublicationDetails(publicationId: number) {
    // Redirige vers la page de détails de la publication avec l'ID de la publication
    this.router.navigate(['/publication', publicationId]);
  }
}
