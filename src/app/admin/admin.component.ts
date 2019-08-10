import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MusicsService } from '../services/musics.service';
import { SingerService } from '../services/singer.service';
import { TypeService } from '../services/type.service';
import { UsersService } from '../services/users.service';
import { MusicTempService } from '../services/music-temp.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Singer } from '../interfaces/singer.interface';
import { Music } from '../interfaces/music.interface';
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
  idsinger;
  music;
  type;
  getMusic;
  getImage;
  newMusic;
  newSinger;
  getTypeID;
  getSingerID;
  linkavataSinger;
  public singers : Singer[];
  addMusicForm: FormGroup;
  updateMusicForm: FormGroup;
  addSingerForm: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder, 
    private toastr:ToastrService,
    private MusicSV: MusicsService, 
    private singerService: SingerService, 
    private usersService: UsersService, 
    private musicTempService: MusicTempService,
    private TypeService: TypeService) { }

  ngOnInit() {
    this.getDataAdmin();
    this.buildAllForm();
    this.getAllType();
    this.getAllSinger();
  }


  getDataAdmin(){
    this.MusicSV.getMusics().subscribe(data => {
      this.nhac = data;
    });
    this.usersService.getUsers().subscribe(data => {
      this.user = data;
    });
    this.musicTempService.getAllMusicTemp().subscribe(data => {
      this.nhacTemp = data;
    });
  }
  buildAllForm(){
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
    this.addSingerForm = new FormGroup({
      singerName: new FormControl(),
      nation: new FormControl(),
      story: new FormControl(),
      avatar: new FormControl()
    })
    this.buildFormAddSinger();
  }

  getLinkAvatarSinger(event:any){
    console.log(event.target.files[0].name);
    this.linkavataSinger = event.target.files[0].name;
  }
  AddSinger(){
    this.addSingerForm['avatar'] = this.linkavataSinger;
    this.newSinger = {
      singerName: this.addSingerForm.get('singerName').value,
      avatar: this.addSingerForm['avatar'],
      nation: this.addSingerForm.get('nation').value,
      story: this.addSingerForm.get('story').value,
    }
    if(this.addSingerForm.get('singerName').value == '' ||
    this.addSingerForm['avatar'] == '' ||
    this.addSingerForm.get('nation').value == '' ||
    this.addSingerForm.get('story').value == ''
    ){
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    console.log(this.newSinger);
    this.singerService.AddSinger(this.newSinger).subscribe(data => {
      if(data['name'] == 'MongoError'){
        alert('Thông tin bị trùng, vui lòng nhập nghệ sĩ khác');
        return;
      }
      setTimeout(()=>{
        document.location.reload(true)
        },100)
    })
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
  buildFormAddSinger(){
    this.addSingerForm = this.formBuilder.group({
      singerName: ['', [
        Validators.required
      ]],
      nation: ['', [
        Validators.required
      ]],
      story: ['', [
        Validators.required
      ]],
      avatar: ['', [
        Validators.required
      ]]
    })
  }
  DeleteUser(id) {
    // console.log("Delete user : " + id);
    this.usersService.DeleteUserbyID(id).subscribe(data =>{
      this.usersService.getUsers().subscribe(newData=>{
        this.user = newData;
        $('#DeleteUser').modal('hide');
        this.router.navigate([`/admin`]);
      })
    });
  }
  DeleteMusic(id) {
    // console.log("Delete music : " + id);
    this.MusicSV.DeleteMusicbyID(id).subscribe(data => {
      this.MusicSV.getMusics().subscribe(newData => {
        this.nhac = newData;
        $('#DeleteMusic').modal('hide');
      })
    })
  }
  EditMusic(id) {
    console.log("Edit music : " + id);

  }
  getIDUsertoEdit(id) {
    this.usersService.getUserbyID(id).subscribe(data => {
      this.iduser = data;
      // console.log(this.iduser);
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
      // console.log(this.idmusic);
    })
  }
  getIDSingertoDelete(id){
    this.idsinger = id;
  }
  DeleteSinger(id){
    this.singerService.DeleteSingerbyID(id).subscribe(data => {
      console.log(data);
      this.singerService.getAllSinger().subscribe(newData => {
        this.singers = newData;
        $('#DeleteSinger').modal('hide');
      })
    })
    
  }
  UpdateLyrics(id, songUpdate){
    console.log(id);
    console.log(songUpdate);
    
    this.music = {
      country: songUpdate.country,
      isVideo: songUpdate.isVideo,
      listMusic: songUpdate.listMusic,
      lyrics: songUpdate.lyrics,
      musicName: songUpdate.musicName,
      musicType: songUpdate.musicType,
      singer: songUpdate.singer
    }
    console.log(this.music);
    
    this.MusicSV.AddLyrics(id, this.music).subscribe(data => {
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
  getAllType(){
    this.TypeService.getAllType().subscribe(data => {
      this.type = data;
      console.log(this.type);
    })
  }
  getIDType(event:any){
    console.log(event.target.value);
    this.getTypeID = event.target.value;
  }
  getAllSinger(){
    this.singerService.getAllSinger().subscribe((data:Singer[]) => {
      this.singers = data; 
      console.log(this.singers);
    })
  }
  getIDSinger(event:any){
    console.log(event.target.value);
    this.getSingerID = event.target.value;
  }
  getLinkMusic(event:any){
    console.log(event.target.files[0].name);
    this.getMusic = event.target.files[0].name;
  }
  getLinkImage(event:any){
    console.log(event.target.files[0].name);
    this.getImage = event.target.files[0].name;
  }
  AddMusic(){
    this.addMusicForm['linkMusic'] = this.getMusic;
    this.addMusicForm['image'] = this.getImage;
    this.addMusicForm['musicType'] = this.getTypeID;
    this.addMusicForm['singer'] = this.getSingerID;
    this.newMusic = {
      musicName: this.addMusicForm.get('musicName').value,
      image: this.addMusicForm['image'],
      isVideo: this.addMusicForm.get('isVideo').value,
      linkMusic: this.addMusicForm['linkMusic'],
      lyrics: this.addMusicForm.get('lyrics').value,
      musicType: this.addMusicForm['musicType'],
      singer: this.addMusicForm['singer'],
      country: this.addMusicForm.get('country').value
    }
    if(this.addMusicForm['linkMusic'] == '' ||
    this.addMusicForm['image'] == ''||
    this.addMusicForm['musicType'] == '' ||
    this.addMusicForm['singer'] == '' ||
    this.addMusicForm.get('musicName').value == '' ||
    this.addMusicForm.get('isVideo').value == '' ||
    this.addMusicForm.get('lyrics').value == '' ||
    this.addMusicForm.get('country').value == ''
    ){
      alert("Vui lòng điền đầy đủ thông tin trước khi thêm");
      return;
    }
    this.MusicSV.AddMusic(this.newMusic).subscribe(data => {
      setTimeout(()=>{
        document.location.reload(true)
        },100)
    })    
  }
  getIDMusictoUpdate(id){
    this.MusicSV.getMusicsById(id).subscribe(data => {
      this.idmusic = data;
      console.log(this.idmusic);
    })
  }
  UpdateMusic(){
    console.log("Cập nhật bài hát");
    
  }
}
