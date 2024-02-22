import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationsService } from '../publications.service';
import { PublicationCreation } from './interfaces/publication-creation-interface';
import { UserService } from '../user.service';
import { User } from './interfaces/user-interface';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  publication!: PublicationCreation;
  plants: any[] = [];
  idUser!: number;
  user!: User;

  constructor(private route: ActivatedRoute, private publicationsService: PublicationsService,
     private userService : UserService) { }

  ngOnInit(): void {
    const publicationIdParam = this.route.snapshot.paramMap.get('id');

    if (publicationIdParam !== null) {
      const publicationId = +publicationIdParam;

      this.publicationsService.getPublicationById(publicationId).subscribe((data: any) => {
        
        this.publication = data;
        console.log(this.publication);
        this.plants = data.plants;
        //this.idUser = data.publisher.id;
      });      
    }
    //console.log(this.idUser);
    // this.userService.getUserById(this.idUser).subscribe((user: User) => {
    //   this.user =  user;
    // });
  }
}
