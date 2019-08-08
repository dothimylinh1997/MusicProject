import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';

import { CommentService } from '../services/comment.service';
import { MusicsService } from '../services/musics.service';
import { Router, ActivatedRoute } from '@angular/router';

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
   @ViewChild('videoOption', { static: false }) videoPlayerRef: ElementRef;
  constructor(private MusicSV:MusicsService,
     private activatedRoute: ActivatedRoute,
     private commentService: CommentService,
     private router: Router,
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
}
