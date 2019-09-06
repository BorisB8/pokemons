import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule} from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule, Routes} from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import 'hammerjs';
import { Version1Component } from './version1/version1.component';
import { Version2Component } from './version2/version2.component';
import {PokeapiService} from './pokeapi.service';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import {MatGridListModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'version1', component: Version1Component },
  { path: 'version2', component: Version2Component }
];
@NgModule({
  declarations: [
    AppComponent,
    Version1Component,
    Version2Component,
    DialogComponent,
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatGridListModule,
    MatTooltipModule,
    RouterModule.forRoot(appRoutes),
    MatSnackBarModule
  ],
  providers: [
    PokeapiService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
