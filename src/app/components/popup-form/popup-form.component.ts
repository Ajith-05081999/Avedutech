import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-popup-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.css']
})
export class PopupFormComponent implements OnInit {
  isVisible = true;
  contactForm: FormGroup;
  isSubmitting = false;
  isSuccess = false;

  constructor(private fb: FormBuilder, private formService: FormService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      stream: ['', Validators.required],
      fees: ['', Validators.required],
      consent: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      const isSubmitted = sessionStorage.getItem('popupSubmitted');
      if (!isSubmitted) {
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.formService.submitToGoogleSheet(this.contactForm.value).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.isSuccess = true;
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('popupSubmitted', 'true');
          }
          // Only unlock website access after successful transmission
          setTimeout(() => {
            this.isVisible = false;
          }, 3000);
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
