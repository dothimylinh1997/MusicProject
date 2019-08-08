import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MusicsService } from '../services/musics.service';
import { SingerService } from '../services/singer.service';
import { UsersService } from '../services/users.service';
import { MusicTempService } from '../services/music-temp.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
// import { $ } from 'protractor';

declare var $:any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
  nhac: any;
  user: any;
  nhacTemp: any;
  iduser;
  idmusic;
  addMusicForm: FormGroup;
  updateMusicForm: FormGroup;
  constructor(private router: Router,private formBuilder: FormBuilder, private toastr:ToastrService,private MusicSV: MusicsService, private singerService: SingerService, private usersService: UsersService, private musicTempService: MusicTempService) { }

  ngOnInit() {
    this.MusicSV.getMusics().subscribe(data => {
      this.nhac = data;
      console.log(data);
    });
    this.usersService.getUsers().subscribe(data => {
      this.user = data;
      console.log(this.user);
    });
    this.musicTempService.getAllMusicTemp().subscribe(data => {
      this.nhacTemp = data;
      console.log(data);
    });

    this.addMusicForm = new FormGroup({
      musicName: new FormControl(),
      musicType:  new FormControl(),
      lyrics: new FormControl(),
      isVideo: new FormControl(),
      linkMusic: new FormControl(),
      image: new FormControl(),
      country: new FormControl(),
      singer: new FormControl()
    })
    this.buildAddMusicForm();

    this.updateMusicForm = new FormGroup({
      musicName: new FormControl(),
      musicType:  new FormControl(),
      lyrics: new FormControl(),
      isVideo: new FormControl(),
      linkMusic: new FormControl(),
      image: new FormControl(),
      country: new FormControl(),
      singer: new FormControl()
    })
    this.buildUpdateMusicForm();
  }
  buildAddMusicForm(){
    this.addMusicForm = this.formBuilder.group({
      musicName: ['', [
        Validators.required
      ]],
      musicType: ['', [
        Validators.required
      ]],
      lyrics: [''],
      isVideo: ['', [
        Validators.required
      ]],
      linkMusic: ['', [
        Validators.required
      ]],
      image: ['', [
        Validators.required
      ]],
      country: ['', [
        Validators.required
      ]],
      singer: ['', [
        Validators.required
      ]]
    })
  }
  buildUpdateMusicForm(){
    this.addMusicForm = this.formBuilder.group({
      musicName: ['', [
        Validators.required
      ]],
      musicType: ['', [
        Validators.required
      ]],
      lyrics: [''],
      isVideo: ['', [
        Validators.required
      ]],
      linkMusic: ['', [
        Validators.required
      ]],
      image: ['', [
        Validators.required
      ]],
      country: ['', [
        Validators.required
      ]],
      singer: ['', [
        Validators.required
      ]]
    })
    this.updateMusicForm.setValue({
      musicName: new FormControl(),
      musicType:  new FormControl(),
      lyrics: new FormControl(),
      isVideo: new FormControl(),
      linkMusic: new FormControl(),
      image: new FormControl(),
      country: new FormControl(),
      singer: new FormControl()
    })

  }



  DeleteUser(id) {
    console.log("Delete user : " + id);
    this.usersService.DeleteUserbyID(id).subscribe(data =>{
      this.usersService.getUsers().subscribe(newData=>{
        this.user = newData;
        $('#DeleteUser').modal('hide');
        this.router.navigate([`/admin`]);
      })
    });
  }
  DeleteMusic(id) {
    console.log("Delete music : " + id);
    this.MusicSV.DeleteMusicbyID(id).subscribe(data => {
      this.MusicSV.getMusics().subscribe(newData => {
        this.nhac = newData;
        $('#DeleteMusic').modal('hide');
      })
    })
  }
  EditUser(id) {
    console.log("Edit user : " + id);

  }
  EditMusic(id) {
    console.log("Edit music : " + id);

  }
  getIDUsertoEdit(id) {
    this.usersService.getUserbyID(id).subscribe(data => {
      this.iduser = data;
      console.log(this.iduser);
    })
  }
  getIDUsertoDelete(id) {
    this.usersService.getUserbyID(id).subscribe(data => {
      this.iduser = data;
    })
  }
  getIDMusictoDelete(id){
    this.MusicSV.getMusicsById(id).subscribe(data => {
      this.idmusic = data;
      console.log(this.idmusic);
    })
  }
  getIDMusictoUpdate(id){
    this.MusicSV.getMusicsById(id).subscribe(data => {
      this.idmusic = data;
      console.log(this.idmusic);
    })
  }

  UpdateLyrics(id, music){
    console.log(id);
    console.log(music);
    this.MusicSV.AddLyrics(id, music).subscribe(data => {
      console.log(data);
      this.MusicSV.getMusics().subscribe(newData =>{
        this.nhac = newData;
        console.log(this.nhac);
        this.router.navigate([`/admin`]);
          setTimeout(() => {
            document.location.reload(true)
          }, 100)
      })
    })
  }
}
