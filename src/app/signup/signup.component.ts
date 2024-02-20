import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from './user-api.service';
import { UserInterface } from './interfaces/user-interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserApiService) {
    this.signupForm = this.fb.group({
      Nom: ['', Validators.required],
      Prénom: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      motDepasse: ['', Validators.required],
      statut: ['']
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      console.log('User submitted:', userData);
      // Add logic to handle form submission (e.g., send data to a server)
    }
  }

  setParticulier() {
    this.signupForm.patchValue({
      statut: 'Particulier'
    });
  }

  setProfessional() {
    this.signupForm.patchValue({
      statut: 'Professional'
    });
  }
}
