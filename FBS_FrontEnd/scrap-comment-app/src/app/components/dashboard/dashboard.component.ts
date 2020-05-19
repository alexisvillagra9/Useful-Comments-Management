import { Component, OnInit } from '@angular/core';
import { Cantidades } from 'src/app/models/Comentarios/quantities';
import { CommentsListService } from 'src/app/services/comments/comments-list.service';
import { TypeComment } from 'src/app/models/enums';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  typeComment = TypeComment;
  totalComments: Cantidades;

  constructor(private commentsListService: CommentsListService) {
    this.totalComments = new Cantidades();
  }

  ngOnInit(): void {
    this.getCantComments();
  }

  getCantComments() {
    this.commentsListService.getCommentsCount().subscribe(res => {
      this.totalComments = res;
    });
  }

  getPercentage(quant: number) {
    let totComPer = Math.round((quant * 100) / this.totalComments.total);
    if (isNaN(totComPer)) {
      totComPer = 0;
    }
    return totComPer;
  }
}
