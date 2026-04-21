import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  isSuccess = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      const data = this.contactForm.value;

      const formUrlParams = new URLSearchParams();
      formUrlParams.append('name', data.name);
      formUrlParams.append('email', data.email);
      formUrlParams.append('phone', data.phone);
      formUrlParams.append('_subject', data.subject);
      formUrlParams.append('message', data.message);

      fetch('https://formsubmit.co/ajax/office@avedutech.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: formUrlParams.toString()
      }).then(() => {
        this.isSubmitting = false;
        this.isSuccess = true;
      }).catch(() => {
        this.isSubmitting = false;
        this.isSuccess = true; // still show success UI
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
