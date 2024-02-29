import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCreateService } from '../user-create.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthenticationRequest } from '../authentication-request.interface'; // Import de AuthenticationRequest
import { AuthenticationResponse } from '../authentication-response.interface'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  registrationSuccess = false;

  constructor(
    private fb: FormBuilder,
    private userCreateService: UserCreateService,
    private router: Router,
    private authService: AuthService // Correction ici: Utilisation de AuthService au lieu de AuthServiceService
    
  ) {
    console.log(this.authService); 
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
      const userData = this.signupForm.value;
      this.userCreateService.createUser(userData).subscribe(
        (response) => {
          console.log('User created successfully:', response);
          const authRequest: AuthenticationRequest = {
            email: userData.email,
            password: userData.password,
          };
          this.authService.authenticateUser(authRequest).subscribe( // Correction ici: Utilisation de authenticateUser
            (authResponse: AuthenticationResponse) => {
              console.log('Authentication successful:', authResponse);
              this.registrationSuccess = true;
              setTimeout(() => {
                this.registrationSuccess = false;
                this.router.navigate(['/profile']);
              }, 1000);
            },
            
          );
        },
        (error) => {
          console.error('Error creating user:', error);
          // Gérer les erreurs de création d'utilisateur ici
        }
      );
    }
  }
}
