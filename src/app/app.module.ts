import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MemeSelectionComponent } from './components/meme-selection/meme-selection.component';
import { MemeDetailsComponent } from './components/meme-details/meme-details.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [AppComponent, MemeSelectionComponent, MemeDetailsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'meme-selection', component: MemeSelectionComponent },
      { path: 'meme-details/:id', component: MemeDetailsComponent },
      { path: '', redirectTo: '/meme-selection', pathMatch: 'full' },
    ]),
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
