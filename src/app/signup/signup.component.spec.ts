import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { FormBuilder } from '@angular/forms';
import { UserCreateService } from '../user-create.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UserInterface } from './interfaces/user-interface';
import { ReactiveFormsModule } from '@angular/forms';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let userCreateService: UserCreateService;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule], // Ajoutez ReactiveFormsModule ici
      providers: [FormBuilder, UserCreateService]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    userCreateService = TestBed.inject(UserCreateService);
    fb = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize signupForm correctly', () => {
    expect(component.signupForm).toBeDefined();
    expect(component.signupForm.get('firstName')).toBeDefined();
    expect(component.signupForm.get('lastName')).toBeDefined();
    expect(component.signupForm.get('email')).toBeDefined();
    expect(component.signupForm.get('password')).toBeDefined();
  });
  
  it('should have invalid form when initialized', () => {
    expect(component.signupForm.valid).toBeFalsy();
  });
  
  it('should have required validators for firstName, lastName, email, and password fields', () => {
    const firstNameControl = component.signupForm.get('firstName');
    const lastNameControl = component.signupForm.get('lastName');
    const emailControl = component.signupForm.get('email');
    const passwordControl = component.signupForm.get('password');
  
    expect(firstNameControl?.hasError('required')).toBeTruthy();
    expect(lastNameControl?.hasError('required')).toBeTruthy();
    expect(emailControl?.hasError('required')).toBeTruthy();
    expect(passwordControl?.hasError('required')).toBeTruthy();
  });
  
  it('should have email validator for email field', () => {
    const emailControl = component.signupForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTruthy();
  });
  
  it('should enable submit button when form is valid', () => {
    component.signupForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password'
    });
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeFalsy();
  });
  

  it('should submit signup form', () => {
    const userData: UserInterface = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      userType: { id: 1, name: 'casual' }
    };

    spyOn(userCreateService, 'createUser').and.returnValue(of(userData));

    component.signupForm = fb.group({
      firstName: ['John'],
      lastName: ['Doe'],
      email: ['john.doe@example.com'],
      password: ['password']
    });

    component.submit();

    expect(userCreateService.createUser).toHaveBeenCalledWith(jasmine.objectContaining({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      userType: jasmine.objectContaining({ id: 1, name: 'casual' })
    }));
    
    expect(component.registrationSuccess).toBeTruthy();
  });
});
