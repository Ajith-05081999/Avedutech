import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LeadsComponent } from './components/leads/leads.component';
import { TrustComponent } from './components/trust/trust.component';
import { SearchComponent } from './components/search/search.component';
import { ContactComponent } from './components/contact/contact.component';
import { CollegeContactComponent } from './components/college-contact/college-contact.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'leads', component: LeadsComponent },
  { path: 'trust', component: TrustComponent },
  { path: 'search', component: SearchComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'college-contact', component: CollegeContactComponent },
  { path: '**', redirectTo: '/home' }
];
