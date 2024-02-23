// ajouter-publication.component.ts
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
  styleUrls: ['./ajouter-publication.component.css']
})
export class AjouterPublicationComponent implements OnInit{
  nomPlante: string = '';
  description: string = '';
  selectedFile: File | null = null;

  formPublication!: FormGroup;
  plantForm!: FormGroup;
  plants!: FormArray;
  addressesUser!: Address[];
  plantsUser!: Plant[];

  constructor(private router: Router, private formBuilder: FormBuilder,
     private publicationService: PublicationsService,
     private adressService: AddressService,
     private plantService: PlantService) {}
  async ngOnInit(){
    this.plants = this.formBuilder.array([]);

    this.adressService.getAdressByUserId(1).subscribe(addresses=>{
      this.addressesUser = addresses;
    })

    this.plantService.getPlantsByUserId(1).subscribe(plants=>{
      this.plantsUser = plants;
    })
    
    this.formPublication = this.formBuilder.group({
      description: ['', Validators.required],
      address: ['', Validators.required],
      plants: this.plantForm
    });

    this.plantForm = this.formBuilder.group({
      selectedPlants: this.formBuilder.array([])
    });
  }

  get selectedPlants() {
    return this.plantForm.get('selectedPlants') as FormArray;
  }

  onPlantSelected(plantId: Event): void {
    const selectedPlant = this.plantsUser.find(plant => plant.id === +plantId);
    if (selectedPlant) {
      this.selectedPlants.push(new FormControl(selectedPlant.name));
    }
  }

  

  ajouterPublication(): void {
    // Logique pour ajouter la publication dans la base de données avec les valeurs saisies
    // et le fichier sélectionné

      // Envoyer le fichier au serveur
      let publication = new PublicationCreation();
      publication.description = this.formPublication.get("description")?.value;
      publication.addressId = this.formPublication.get("address")?.value;
      publication.plantsId = this.formPublication.get("plants")?.value;

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

  onAddPlant(): void {
    const plantId = this.plantForm.get('plantSelect')?.value;
    this.onPlantSelected(plantId);
  }
}
