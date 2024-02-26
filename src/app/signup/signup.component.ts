import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCreateService } from '../user-create.service'; // Correction de l'import du service
import { UserInterface } from './interfaces/user-interface'; // Assurez-vous que le chemin d'importation est correct
import { UserTypeInterface } from './interfaces/user-type-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  userData!: UserInterface;
  userDataType!: UserTypeInterface;
  registrationSuccess = false; // Variable pour suivre l'état de l'inscription

  constructor(
    private fb: FormBuilder,
    private userCreateService: UserCreateService,
    private router: Router
  ) {
    // Correction de l'injection du service
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  submit() {
    if (this.signupForm.valid) {
      this.userData = new UserInterface();
      this.userDataType = new UserTypeInterface();

      this.userDataType.id = 1;
      this.userDataType.name = 'casual';
      this.userData.firstName = this.signupForm.get('firstName')?.value;
      this.userData.lastName = this.signupForm.get('lastName')?.value;
      this.userData.email = this.signupForm.get('email')?.value;
      this.userData.password = this.signupForm.get('password')?.value;

      this.userData.userType = this.userDataType;

      console.log('User submitted:', this.userData);
      this.userCreateService
        .createUser(this.userData) // Utilisation du service pour créer l'utilisateur
        .subscribe(
          (response) => {
            console.log('User created successfully:', response);
            this.registrationSuccess = true;
            setTimeout(() => {
              this.registrationSuccess = false;
              this.router.navigate(['/signin']); // Rediriger après l'affichage de l'alerte
            }, 1000);
           },
          (error) => {
            console.error('Error creating user:', error);
            // Ajoutez ici la logique à effectuer en cas d'erreur lors de la création de l'utilisateur
          }
        );
    }
  }
}
