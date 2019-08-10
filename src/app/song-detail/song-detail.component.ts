import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MusicsService } from '../services/musics.service';
import { MusicTempService } from '../services/music-temp.service';
import { CommentService } from '../services/comment.service';
import { ListMusicService } from '../services/list-music.service';
import { Comment } from '../interfaces/comment.interface';
import { Music } from '../interfaces/music.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import { List } from '../interfaces/list.interface';

declare var $: any;

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss'] //Sau nay viet code nhung cho khai bao nhieu the nay e nen de dau , vao elm cuoi cung luon
})
export class SongDetailComponent implements OnInit {

  nhac;
  songs;
  music;
  musics;
  listMusic;
  linkMS;
  comment;
  comments;
  user;
  test;
  list;
  idList;
  id;
  lists;
  content: Comment;
  AddLikeMusic: FormGroup;
  @ViewChild('audioOption', { static: false }) audioPlayerRef: ElementRef;
  constructor(private MusicSV: MusicsService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private musicTempService: MusicTempService,
    private listMusicService: ListMusicService,
    private router: Router
  ) { }
  ngAfterViewInit() {
    this.activatedRoute.params.subscribe(params => {
      this.commentService.getCommnetbyMusic(params['id']).subscribe((dataMusic: any) => {
        this.nhac = dataMusic;
        // console.log(this.nhac);
        this.audioPlayerRef.nativeElement.src = this.nhac.linkMusic;
      })
    })
  }
  ngOnInit() {
    this.user = JSON.parse(`${localStorage.getItem('user')}`);

    this.activatedRoute.params.subscribe(params => {
      this.commentService.getCommnetbyMusic(params['id']).subscribe((dataMusic: any) => {
        this.comments = dataMusic.comment;
      })
    })
    this.getAllMusicByList();

  }
  AddComment(id, id_, cmt) {
    console.log(id + "\t" + id_ + "\t" + cmt);

    this.comment = {
      comment: cmt,
      user: id,
      music: id_
    };
    console.log(this.comment);

    if (cmt != '') {
      this.commentService.AddComment(this.comment).subscribe(data => {
        this.commentService.getCommnetbyMusic(id_).subscribe(newData => {
          this.comments = newData;
          $('#comment').value = '';
          this.router.navigate([`/song-detail/${id_}`]);
          setTimeout(() => {
            document.location.reload(true)
          }, 100)
        })
      })
    }
  }

  getAllMusicByList() {
    this.user = JSON.parse(`${localStorage.getItem('user')}`);
    this.listMusicService.getListByUser(this.user._id).subscribe((data: List) => {
      this.lists = data.listMusic;
      console.log(this.lists);
    })
  }
  AddLyrics(id_, lyrics) {
    console.log(lyrics + "\t" + id_);
    this.music = {
      id: id_,
      musicName: this.nhac.musicName,
      musicType: this.nhac.musicType,
      lyrics: lyrics,
      isVideo: this.nhac.isVideo,
      linkMusic: this.nhac.linkMusic,
      image: this.nhac.image,
      country: this.nhac.country,
      comment: this.nhac.comment,
      singer: this.nhac.singer,
      listMusic: this.nhac.listMusic
    };
    this.musicTempService.AddMusicTemp(this.music).subscribe(data => {
      console.log(data);
      this.MusicSV.getMusicsById(id_).subscribe(newData => {
        this.nhac = newData,
        this.audioPlayerRef.nativeElement.src = this.nhac.linkMusic;
        $('#comment').value = '';
          this.router.navigate([`/song-detail/${id_}`]);
          setTimeout(() => {
            document.location.reload(true)
          }, 100)
      })
    })
    
  }

  getIDList(id){
    console.log(id);
    this.idList = id;
  }
  ThemDSYeu(nhac){
    this.id = this.idList;
    console.log(this.id);
    this.list = {
      music: nhac
    }
    console.log(this.list);
    this.MusicSV.getMusicByList(this.id).subscribe((ahihidata:any) =>{
      if (!ahihidata.music.some((item) => item._id == nhac._id)) {
        ahihidata.music.push(nhac);
        alert("Thêm thành công");
      }
      else{
        alert("Trùng bài hát");
      }
      
      this.listMusicService.updateListMusic(this.id, ahihidata).subscribe(data => {
        console.log(data);

      });
    })
      this.listMusicService.updateListMusic(this.id, this.list).subscribe(data => {
        console.log(data);
        $('ThemDSYeu').modal('hide');
      });
  }
}
