import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicationsService } from '../publications.service';
import { PublicationCreation } from '../publication/interfaces/publication-creation-interface';
import { AddressService } from '../address.service';
import { Address } from './classes/adresse';
import { Plant } from './classes/plant';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-ajouter-publication',
  templateUrl: './ajouter-publication.component.html',
  styleUrls: ['./ajouter-publication.component.css'],
})
export class AjouterPublicationComponent implements OnInit {
  nomPlante: string = '';
  description: string = '';
  selectedFile: File | null = null;

  formPublication!: FormGroup;
  plantForm!: FormGroup;
  plants!: FormArray;
  addressesUser!: Address[];
  plantsUser!: Plant[];

  selectedPlantId!: number;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private publicationService: PublicationsService,
    private adressService: AddressService,
    private plantService: PlantService
  ) {}

  async ngOnInit() {
    this.plants = this.formBuilder.array([]);

    this.adressService.getAdressByUserId(1).subscribe((addresses) => {
      this.addressesUser = addresses;
    });

    this.plantService.getPlantsByUserId(1).subscribe((plants) => {
      this.plantsUser = plants;
    });

    this.formPublication = this.formBuilder.group({
      description: ['', Validators.required],
      address: ['', Validators.required],
      plant: ['', Validators.required],
      selectedPlants: this.formBuilder.array([]),
    });
  }

  onPlantSelected(plantId: Event): void {
    const selectedPlant = this.plantsUser.find(
      (plant) => plant.id === +plantId
    );
    if (selectedPlant) {
      this.selectedPlants.push(new FormControl(selectedPlant.name));
    }
  }
  
  
  ajouterPublication(): void {
    // Logique pour ajouter la publication dans la base de données avec les valeurs saisies
    // et le fichier sélectionné

    // Envoyer le fichier au serveur
    let publication = new PublicationCreation();
    publication.description = this.formPublication.get('description')?.value;
    publication.addressId = this.formPublication.get('address')?.value;
    publication.plantsId = this.formPublication.get('selectedPlants')?.value;
    publication.publisherId = 1;

    this.publicationService.PostPublication(publication).subscribe({
      next: () => {
        // Après l'ajout réussi, recharger la liste des publications
        this.ngOnInit();
        // Rediriger l'utilisateur vers la page des publications
        this.router.navigate(['/publications']);
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout de la publication :", error);
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Ajouter une méthode pour ajouter une plante sélectionnée au FormArray
  // Supprimez le paramètre plantId de la méthode addPlantToForm
  addPlantToForm() {
    // Récupérez l'ID de la plante sélectionnée à partir du formulaire
    const selectedPlantId = this.formPublication.get('plant')?.value;

    // Ajoutez l'ID de la plante au FormArray selectedPlants
    this.selectedPlants.push(new FormControl(selectedPlantId));
  }

  // Obtenez le FormArray sélectionné pour une manipulation facile
  get selectedPlants(): FormArray {
    return this.formPublication.get('selectedPlants') as FormArray;
  }
}
