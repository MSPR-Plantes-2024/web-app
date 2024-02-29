import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../authentication-response.interface'; // Import du type AuthenticationResponse

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  registrationSuccess = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Correction ici: Utilisation de AuthService au lieu de AuthServiceService
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  signIn() {
    if (this.signinForm.valid) {
      const authRequest = {
        email: this.signinForm.get('email')?.value,
        password: this.signinForm.get('password')?.value
      };
      this.authService.authenticateUser(authRequest).subscribe(
        (authResponse: AuthenticationResponse) => {
          console.log('Authentication successful:', authResponse);
          this.registrationSuccess = true;
          setTimeout(() => {
            this.registrationSuccess = false;
            this.router.navigate(['/profile']);
          }, 1000);
        },
        (error : any) => {
          console.error('Authentication failed:', error);
          // Gérer les erreurs d'authentification ici
        }
      );
    }
  }
}
