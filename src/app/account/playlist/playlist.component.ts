import { Component, OnInit } from '@angular/core';
import { ListMusicService } from '../../services/list-music.service';
import { List } from "../../interfaces/list.interface";
import { Music } from "../../interfaces/music.interface";
import { MusicsService } from 'src/app/services/musics.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  list;
  lists;
  lists1;
  music: Music;
  user;
  nhac;
  AddPlaylistForm: FormGroup;
  constructor(
    private listMusicService: ListMusicService,
    private musicsService: MusicsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // this.user = JSON.parse(`${localStorage.getItem('user')}`);
    // this.listMusicService.getListByUser(this.user._id).subscribe((data) => {
    //   this.list = data
    //   console.log(data);
    // })

    this.getAllMusicByList();
    this.AddPlaylistForm = new FormGroup({
      listName: new FormControl(),
    })
    this.buildAddListForm();
  }

  getAllMusicByList() {
    this.user = JSON.parse(`${localStorage.getItem('user')}`);
    console.log(this.user._id);
    this.listMusicService.getListByUser(this.user._id).subscribe((data: List) => {
      this.lists = data;
      this.lists1 = data.listMusic;
      console.log(this.lists1);
    })
  }
  getMusic(id) {
   
      this.musicsService.getMusicByList(id).subscribe((data) => {
        if(data){
          this.router.navigate(['/playlist-detail', data['_id']]);
        }
      })
   
  }
  buildAddListForm(){
    this.AddPlaylistForm = this.formBuilder.group({
      listName: ['', [
        Validators.required
      ]],
      user:[`${this.user._id}`]
    })
  }
  AddPlaylist(){
    this.AddPlaylistForm.value;
    console.log(this.AddPlaylistForm.value);
    
    this.listMusicService.CreateList(this.AddPlaylistForm.value).subscribe(data => {
      console.log(data);
      this.listMusicService.getListByUser(this.user._id).subscribe(newdata=>{
        this.lists = newdata;
        console.log(this.lists);
        $('#AddPlaylist').modal('hide');
        this.router.navigate([`/playlist`]);
        setTimeout(() => {
          document.location.reload(true)
        }, 100)
      })
    });
  }
}
