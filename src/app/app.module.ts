import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { VideoComponent } from './video/video.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material';
import { LoginComponent } from './account/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './account/signup/signup.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { SingerComponent } from './singer/singer.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SongComponent } from './song/song.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { UpdateAccountComponent } from './account/update-account/update-account.component';
import { SingerDetailComponent } from './singer-detail/singer-detail.component';
import { PlaylistComponent } from './account/playlist/playlist.component';
import { TypePipe } from './pipe/type.pipe';
import { AdminComponent } from './admin/admin.component';
import { TypeComponent } from './type/type.component';
import { TypeDetailComponent } from './type-detail/type-detail.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { PlaylistDetailComponent } from './account/playlist-detail/playlist-detail.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    HeaderComponent,
    FooterComponent,
    VideoComponent,
    LoginComponent,
    SignupComponent,
    VideoDetailComponent,
    HomePageComponent,
    SingerComponent,
    SongComponent,
    SongDetailComponent,
    UpdateAccountComponent,
    SingerDetailComponent,
    PlaylistComponent,
    TypePipe,
    AdminComponent,
    TypeComponent,
    TypeDetailComponent,
    PlaylistDetailComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTabsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    Ng2SearchPipeModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
