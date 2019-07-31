import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';
import { VideoComponent } from './video/video.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SongComponent } from './song/song.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SingerComponent } from './singer/singer.component';


const routes: Routes = [
  {path:'home',component:HomePageComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'video', component: VideoComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'video-detail', component: VideoDetailComponent},
  { path: 'song', component: SongComponent},
  { path: 'song-detail', component: SongDetailComponent},
  { path: 'singer', component: SingerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
