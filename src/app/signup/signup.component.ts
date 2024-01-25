import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // No need to initialize the form here if you're initializing it inline
  }

  submit() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      console.log('User submitted:', userData);
      // Add logic to handle form submission (e.g., send data to a server)
    }
  }
}
