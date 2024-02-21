import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationsService } from '../publications.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  publication: any;
  plants: any[] = [];
  owner: any;

  constructor(private route: ActivatedRoute, private publicationsService: PublicationsService) { }

  ngOnInit(): void {
    const publicationIdParam = this.route.snapshot.paramMap.get('id');

    if (publicationIdParam !== null) {
      const publicationId = +publicationIdParam;

      this.publicationsService.getPublicationById(publicationId).subscribe((data: any) => {
        this.publication = data;
        this.plants = data.plants;
        
         const ownerId = data.publisherId;


         this.owner = data.users;
        
      });
    }
  }
}
