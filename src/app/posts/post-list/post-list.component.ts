import { PostsService } from './../posts.service';
import { Post } from './../post.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: [
    './post-list.component.css'
]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'Post One', content: 'Post\'s Content One'},
  //   {title: 'Post Two', content: 'Post\'s Content Two'},
  //   {title: 'Post Three', content: 'Post\'s Content Three'}
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public PostsService:PostsService) {}

  ngOnInit() {
    this.posts = this.PostsService.getPosts();
    this.postsSub = this.PostsService.getPostUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
