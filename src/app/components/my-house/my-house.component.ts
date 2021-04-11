import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/posts/post.model';
import { PersonService } from 'src/app/services/social/person.service';
import { PostService } from 'src/app/services/social/post.service';

@Component({
  selector: 'app-my-house',
  templateUrl: './my-house.component.html',
  styleUrls: ['./my-house.component.css']
})
export class MyHouseComponent implements OnInit {
  posts!: Post[];

  constructor(
    private postService: PostService,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.postService.getManyByPoster().subscribe(posts => this.posts = posts);
  }

  onPosted(post: Post): void {
    this.posts.unshift(post);
  }

  onCropped(image: Blob) {
    const formData = new FormData();
    formData.append('ProfileImage', image);
    this.personService.updateProfileImage(formData).subscribe();
  }

}
