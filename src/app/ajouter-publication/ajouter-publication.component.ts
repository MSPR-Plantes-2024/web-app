// ajouter-publication.component.ts
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicationsService } from '../publications.service';
import { PublicationCreation } from '../publication/interfaces/publication-creation-interface';

@Component({
  selector: 'app-ajouter-publication',
  templateUrl: './ajouter-publication.component.html',
  styleUrls: ['./ajouter-publication.component.css']
})
export class AjouterPublicationComponent implements OnInit{
  nomPlante: string = '';
  description: string = '';
  selectedFile: File | null = null;

  formPublication!: FormGroup;
  plantsId!: FormArray;

  constructor(private router: Router, private formBuilder: FormBuilder, private publicationService: PublicationsService) {}
  async ngOnInit(){
    this.plantsId = this.formBuilder.array([]);

    this.formPublication = this.formBuilder.group({
      description: ['', Validators.required],
      addressId: ['', Validators.required],
      publisherId:['', Validators.required],
      plantsId: this.plantsId
    });
  }

  

  ajouterPublication(): void {
    // Logique pour ajouter la publication dans la base de données avec les valeurs saisies
    // et le fichier sélectionné

      // Envoyer le fichier au serveur
      let publication = new PublicationCreation();
      publication.description = this.formPublication.get("description")?.value;
      publication.addressId = this.formPublication.get("addressId")?.value;
      publication.publisherId = this.formPublication.get("publisherId")?.value;
      publication.plantsId = this.formPublication.get("plantsId")?.value;

      this.publicationService.PostPublication(publication).subscribe({

      });
    

    // Rediriger l'utilisateur vers la page de profil après l'ajout
    this.router.navigate(['/profile']);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  addPlantId(): void {
    const plantsId = this.formPublication.get('plantsId') as FormArray;
    plantsId.push(this.formBuilder.control(''));
  }

  removePlantId(index: number): void {
    const plantsId = this.formPublication.get('plantsId') as FormArray;
    plantsId.removeAt(index);
  }
}
