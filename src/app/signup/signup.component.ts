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
  signupForm: FormGroup = this.fb.group({
    Nom: ['', Validators.required],
    Prénom: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    motDepasse: ['', Validators.required]
  });
  user: UserInterface | undefined;
  constructor(private fb: FormBuilder, private userService: UserApiService) { }

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
  getUser(id: number){
  this.userService.recupererUser(id).subscribe((user)=>{
this.user = user;
console.log("user " + this.user.phoneNumber);
  } );
  }
}
