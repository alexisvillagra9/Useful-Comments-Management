import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Comentarios } from 'src/app/models/Comentarios/comments';
import { MatTableDataSource } from '@angular/material/table';
import { CommentsListService } from 'src/app/services/comments/comments-list.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TypeComment } from '../../models/enums';

@Component({
  selector: 'app-table-comments',
  templateUrl: './table-comments.component.html',
  styleUrls: ['./table-comments.component.css']
})
export class TableCommentsComponent implements OnInit {

  displayedColumns: string[] = [
    'comment_date',
    'comment_text',
    'comment_user_link',
    'comment_user_photo',
    'actions'
  ];

  // Seccion para crear correctamente las Tablas, Orden y Paginado
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Comentarios>([]);

  @Input() type: number;

  constructor(private commentsListService: CommentsListService) {
   }

  ngOnInit(): void {
    // Decidimos que cargamos en base al url
    switch (this.type) {
      case TypeComment.TODOS: {
        this.getComments();
        break;
      }
      case TypeComment.PUBLICACIONES: {
        this.getPost();
        break;
      }
      case TypeComment.RESPUESTAS: {
        this.getReply();
        break;
      }
      case TypeComment.POTABLES: {
        this.getCommentsPotables();
        break;
      }
      default: {
        // this.getComments();
        console.log(this.type);
        break;
      }
    }
  }

  getComments() {
    this.commentsListService.getComments().subscribe(
      res => {
        this.getCommentsPost(res as Comentarios[]);
        console.log('aca');
      },
      error =>
        console.log('error')
    );
  }

  getCommentsPost(comments: Comentarios[]) {
    let finalDataSource: Comentarios[];
    let postDataSource: Comentarios[];
    this.commentsListService.getCommentsPost().subscribe(
      res => {
        postDataSource = res as Comentarios[];
        finalDataSource = comments.concat(postDataSource);
        this.dataSource.data = finalDataSource;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error =>
       console.log('error')
    );
  }

  getPost() {
    this.commentsListService.getCommentsPost().subscribe(
      res => {
        this.dataSource.data = res as Comentarios[];
        // this.isLoading = false;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error =>
        console.log('error')
    );
  }

  getReply() {
    this.commentsListService.getComments().subscribe(
      res => {
        this.dataSource.data = res as Comentarios[];
        // this.isLoading = false;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error =>
       console.log('error')
    );
  }

  getCommentsPotables() {
    let ds1: Comentarios[];
    let ds2: Comentarios[];
    let finalDataSource: Comentarios[];
    this.commentsListService.getCommentsPotables().subscribe(
      res => {
        ds1 = res as Comentarios[];
        this.commentsListService.getCommentsPotablesPost().subscribe(res2 => {
          ds2 = res2 as Comentarios[];
          finalDataSource = ds1.concat(ds2);
          // this.isLoading = false;
          this.dataSource.data = finalDataSource;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
      },
      error =>
        console.log('error')
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
