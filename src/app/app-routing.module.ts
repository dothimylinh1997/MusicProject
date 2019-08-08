import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';
import { VideoComponent } from './video/video.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { SongComponent } from './song/song.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SingerComponent } from './singer/singer.component';
import { UpdateAccountComponent } from './account/update-account/update-account.component';
import { SingerDetailComponent } from './singer-detail/singer-detail.component';
import { PlaylistComponent } from './account/playlist/playlist.component';
import { AdminComponent } from './admin/admin.component';
import { TypeComponent } from './type/type.component';
import { TypeDetailComponent } from './type-detail/type-detail.component';
import { PlaylistDetailComponent } from './account/playlist-detail/playlist-detail.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';


const routes: Routes = [
  {path:'home',component:HomePageComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'video', component: VideoComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'video-detail/:id', component: VideoDetailComponent},
  { path: 'song', component: SongComponent},
  { path: 'song-detail/:id', component: SongDetailComponent},
  { path: 'singer', component: SingerComponent},
  { path: 'update-account', component: UpdateAccountComponent},
  { path: 'singer-detail/:_id', component: SingerDetailComponent},
  { path: 'playlist', component: PlaylistComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'type', component: TypeComponent},
  { path: 'type-detail/:id', component: TypeDetailComponent},
  { path: 'playlist-detail/:id', component: PlaylistDetailComponent},
  { path: 'create-account', component: CreateAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
