// signin.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UserInterface } from '../signup/interfaces/user-interface';
import { Router } from '@angular/router';
import { UserMinimalDto } from './class/userMinimalDTO';
import { User } from '../publication/interfaces/user-interface';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  users!: UserMinimalDto[];
  usersAccounts!: User[];
  registrationSuccess = false; // Variable pour suivre l'état de l'inscription

  signinForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.fetchUserAccounts();
    });

    
  }

  fetchUserAccounts() {
    this.usersAccounts = [];
    this.users.forEach(user => {
      this.userService.getUserById(user.id).subscribe(utilisateur => {
        this.usersAccounts.push(utilisateur);
      });
    });
  }

  SeConnecter() {
    const email = this.signinForm.get("email")?.value;
    const password = this.signinForm.get("password")?.value;

    const user = this.usersAccounts?.find(u => u.email === email && u.password === password);

    if (user) {
      this.registrationSuccess = true;
      setTimeout(() => {
        this.registrationSuccess = false;
        this.router.navigate(['/publications']);
      }, 1000);
    }
  }
}
