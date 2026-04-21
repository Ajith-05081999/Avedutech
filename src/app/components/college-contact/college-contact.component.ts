import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-college-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './college-contact.component.html',
  styleUrls: ['./college-contact.component.css']
})
export class CollegeContactComponent {
  collegeForm: FormGroup;
  isSubmitting = false;
  isSuccess = false;

  constructor(private fb: FormBuilder, private formService: FormService) {
    this.collegeForm = this.fb.group({
      collegeName: ['', Validators.required],
      representativeName: ['', Validators.required],
      designation: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.collegeForm.valid) {
      this.isSubmitting = true;
      this.formService.submitCollegeLead(this.collegeForm.value).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.isSuccess = true;
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      this.collegeForm.markAllAsTouched();
    }
  }
}
