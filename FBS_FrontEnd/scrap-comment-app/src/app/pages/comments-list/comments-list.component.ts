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
  type = 0;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.type = Number(param.type);
      this.typeDescription = TypeComment[this.type];
    });
  }

}
