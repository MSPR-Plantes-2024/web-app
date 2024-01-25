// signin.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signinForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.signinForm.valid) {
      const userData = this.signinForm.value;
      console.log('User signed in:', userData);
      // Add logic to handle signin (e.g., authentication)
    }
  }
}
