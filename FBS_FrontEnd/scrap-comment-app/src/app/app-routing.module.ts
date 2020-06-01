import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CommentsListComponent } from './pages/comments-list/comments-list.component';
import { TargetPagesComponent } from './pages/target-pages/target-pages.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { SettingPageComponent } from './pages/setting-page/setting-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'comments-list/:type', component: CommentsListComponent },
  { path: 'target-pages', component: TargetPagesComponent },
  { path: 'accounts', component: AccountPageComponent },
  { path: 'system-settings', component: SettingPageComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
