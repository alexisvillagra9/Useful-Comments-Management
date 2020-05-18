import { Component, OnInit } from '@angular/core';
import { TypeComment } from 'src/app/models/enums';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  typeDescription = '';
  type: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.type = Number(this.route.snapshot.paramMap.get('type'));
    this.typeDescription = TypeComment[this.type];
  }

}
