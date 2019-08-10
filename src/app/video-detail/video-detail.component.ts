import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { MusicTempService } from '../services/music-temp.service';
import { CommentService } from '../services/comment.service';
import { MusicsService } from '../services/musics.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ListMusicService } from '../services/list-music.service';
import { List } from '../interfaces/list.interface';


declare var $: any;

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {
  
  nhac;
  songs;
  musics;
  listMusic;
  linkMS;
  comment;
  comments;
  user;
  music;
  lists;
  list;
  id;
  idList;
   @ViewChild('videoOption', { static: false }) videoPlayerRef: ElementRef;
  constructor(private MusicSV:MusicsService,
     private activatedRoute: ActivatedRoute,
     private commentService: CommentService,
     private musicTempService: MusicTempService,
     private router: Router,
     private listMusicService: ListMusicService,
      private elRef: ElementRef) { }

  ngAfterViewInit() {
    this.activatedRoute.params.subscribe(params => {
      this.commentService.getCommnetbyMusic(params['id']).subscribe((dataMusic: any) => {
        this.nhac = dataMusic;
        this.videoPlayerRef.nativeElement.src = this.nhac.linkMusic;
      })
    })
  }
  ngOnInit() {
    this.user = JSON.parse(`${localStorage.getItem('user')}`);
    
    this.activatedRoute.params.subscribe(params => {
      this.commentService.getCommnetbyMusic(params['id']).subscribe((dataMusic: any) => {
        this.comments = dataMusic.comment;
        console.log(this.comments);
      })
    })
    
      this.commentService.getCommentbyUser(this.user._id).subscribe((dataMusic: any) => {
        this.comment = dataMusic.comment;
        console.log(this.comment);
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
          this.router.navigate([`/video-detail/${id_}`]);
          setTimeout(()=>{
            document.location.reload(true)
            },100)
        })
      })
    }
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
        this.videoPlayerRef.nativeElement.src = this.nhac.linkMusic;
        $('#comment').value = '';
          this.router.navigate([`/video-detail/${id_}`]);
          setTimeout(() => {
            document.location.reload(true)
          }, 100)
      })
    })
    
  }

  getAllMusicByList() {
    this.user = JSON.parse(`${localStorage.getItem('user')}`);
    this.listMusicService.getListByUser(this.user._id).subscribe((data: List) => {
      this.lists = data.listMusic;
      console.log(this.lists);
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
