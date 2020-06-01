import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { CommentsListComponent } from './pages/comments-list/comments-list.component';
import { TableCommentsComponent } from './components/table-comments/table-comments.component';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import { ClickMenuComponent } from './components/click-menu/click-menu.component';
import { TargetTableComponent } from './components/target-table/target-table.component';
import { TargetPagesComponent } from './pages/target-pages/target-pages.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { SettingPageComponent } from './pages/setting-page/setting-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    CommentsListComponent,
    TableCommentsComponent,
    DialogContentComponent,
    ClickMenuComponent,
    TargetTableComponent,
    TargetPagesComponent,
    AccountsComponent,
    SettingsComponent,
    AccountPageComponent,
    SettingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
