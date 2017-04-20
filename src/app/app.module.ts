import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ChartsModule } from 'ng2-charts';
import { ChartsComponent } from './charts/charts.component';
import { AuthService } from './users/auth.service';
import { AuthGuard } from './auth.guard';
import { ChartsService } from './charts/charts.service';
import { NotesComponent } from './notes/notes.component';
import { NoteService } from './notes/note.service';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    WelcomeComponent,
    NotesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ProductsModule,
    UsersModule,
    ChartsModule,
    AppRoutingModule,
    DatepickerModule.forRoot(),
    RatingModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    ChartsService,
    NoteService,
    AuthService,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
