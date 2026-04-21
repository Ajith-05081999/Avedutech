import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface StudentFormData {
  name: string;
  city: string;
  phone: string;
  email: string;
  stream: string;
  fees: string;
}

export interface CollegeFormData {
  collegeName: string;
  representativeName: string;
  designation: string;
  contactNumber: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormService {
  // Connected securely to your Google App Script Web Hook
  private readonly GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxtH2uYrAuwju8t7n6UQtv5rgK6EODm7He8kCDv07krB2ln-x3RwJf_EgkXDCvU9MpP7w/exec';

  constructor(private http: HttpClient) { }

  submitToGoogleSheet(data: StudentFormData): Observable<any> {
    // Fallback to mock behavior if no URL is provided
    if (!this.GOOGLE_SCRIPT_URL) {
      console.log('Mocking save to Google Sheet with data:', data);
      return of(true).pipe(delay(1500));
    }
    
    // Simulating a standard robust form submission to avoid JSON parsing issues on Google's side
    const formUrlParams = new URLSearchParams();
    formUrlParams.append('name', data.name);
    formUrlParams.append('city', data.city);
    formUrlParams.append('phone', data.phone);
    formUrlParams.append('email', data.email);
    formUrlParams.append('stream', data.stream);
    formUrlParams.append('fees', data.fees);

    const promise = fetch(this.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formUrlParams.toString()
    }).then(() => true).catch(err => {
      console.error('Fetch error:', err);
      return false;
    });

    return new Observable(observer => {
      promise.then(result => {
        observer.next(result);
        observer.complete();
      });
    });
  }

  submitCollegeLead(data: CollegeFormData): Observable<any> {
    const formUrlParams = new URLSearchParams();
    formUrlParams.append('collegeName', data.collegeName);
    formUrlParams.append('representativeName', data.representativeName);
    formUrlParams.append('designation', data.designation);
    formUrlParams.append('contactNumber', data.contactNumber);
    formUrlParams.append('email', data.email);
    formUrlParams.append('message', data.message);
    formUrlParams.append('_subject', 'New College Partnership Lead from AVedutech!');

    const promise = fetch('https://formsubmit.co/ajax/office@avedutech.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: formUrlParams.toString()
    }).then(res => res.json()).then(json => {
      return json.success === 'true';
    }).catch(err => {
      console.error('Fetch error:', err);
      return false;
    });

    return new Observable(observer => {
      promise.then(result => {
        observer.next(result);
        observer.complete();
      });
    });
  }
}
