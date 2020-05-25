import { Component, OnInit, ViewChild, Input, Type } from '@angular/core';
import { Comentarios } from 'src/app/models/Comentarios/comments';
import { MatTableDataSource } from '@angular/material/table';
import { CommentsListService } from 'src/app/services/comments/comments-list.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TypeComment, TypeCommentText } from '../../models/enums';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { FbPostService } from '../../services/fb-post/fb-post.service';

@Component({
  selector: 'app-table-comments',
  templateUrl: './table-comments.component.html',
  styleUrls: ['./table-comments.component.css'],
})
export class TableCommentsComponent implements OnInit {

  displayedColumns: string[] = [
    'comment_date',
    'comment_text',
    'comment_user_link',
    'comment_user_photo',
    'actions',
  ];

  // Seccion para crear correctamente las Tablas, Orden y Paginado
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Comentarios>([]);

  @Input() type: number;
  backgroundImage = '';
  typeComment = TypeComment;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  loading = true;
  potableMsg = '';
  potableTooltip = '';
  commentMenuAux: Comentarios =  new Comentarios();

  constructor(
    private fbPostService: FbPostService,
    private commentsListService: CommentsListService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Decidimos que cargamos en base al url
    switch (this.type) {
      case TypeComment.TODOS: {
        this.getComments();
        this.backgroundImage = this.getBackGroundType(this.type);
        break;
      }
      case TypeComment.PUBLICACIONES: {
        this.getPost();
        this.backgroundImage = this.getBackGroundType(this.type);
        break;
      }
      case TypeComment.RESPUESTAS: {
        this.getReply();
        this.backgroundImage = this.getBackGroundType(this.type);
        break;
      }
      case TypeComment.POTABLES: {
        this.getCommentsPotables();
        this.backgroundImage = this.getBackGroundType(this.type);
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
      (res) => {
        this.getCommentsPost(res as Comentarios[]);
      },
      (error) => console.log('error')
    );
  }

  getCommentsPost(comments: Comentarios[]) {
    let finalDataSource: Comentarios[];
    let postDataSource: Comentarios[];
    this.commentsListService.getCommentsPost().subscribe(
      (res) => {
        postDataSource = res as Comentarios[];
        finalDataSource = comments.concat(postDataSource);
        this.dataSource.data = finalDataSource;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      (error) => console.log('error')
    );
  }

  getPost() {
    this.commentsListService.getCommentsPost().subscribe(
      (res) => {
        this.dataSource.data = res as Comentarios[];
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      (error) => console.log('error')
    );
  }

  getReply() {
    this.commentsListService.getComments().subscribe(
      (res) => {
        this.dataSource.data = res as Comentarios[];
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      (error) => console.log('error')
    );
  }

  getCommentsPotables() {
    let ds1: Comentarios[];
    let ds2: Comentarios[];
    let finalDataSource: Comentarios[];
    this.commentsListService.getCommentsPotables().subscribe(
      (res) => {
        ds1 = res as Comentarios[];
        this.commentsListService.getCommentsPotablesPost().subscribe((res2) => {
          ds2 = res2 as Comentarios[];
          finalDataSource = ds1.concat(ds2);
          this.dataSource.data = finalDataSource;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.loading = false;

        });
      },
      (error) => console.log('error')
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setBackGround(imgUrl: string) {
    let imgUrlFinal = '';

    if (imgUrl === '' || imgUrl === 'undefined' || imgUrl === null) {
      imgUrlFinal = 'src/assets/images/no-photo.jpg';
    } else {
      imgUrlFinal = imgUrl;
    }

    const style = {
      width: '50px',
      height: '50px',
      'border-radius': '50px',
      'background-position': 'center',
      'background-size': 'cover',
      'background-image': 'url(' + imgUrlFinal + ')',
    };
    return style;
  }

  getBackGroundType(type: number) {
    let background = '';

    switch (type) {
      case TypeComment.TODOS:
        background = 'linear-gradient(45deg, #843cf7, #38b8f2)';
        break;
      case TypeComment.PUBLICACIONES: {
        background = 'linear-gradient(45deg, #ee0979, #ff6a00)';
        break;
      }
      case TypeComment.RESPUESTAS: {
        background = 'linear-gradient(45deg, #004b91, #78cc37)';
        break;
      }
      case TypeComment.POTABLES: {
        background = 'linear-gradient(45deg, #9b3cb7, #ff396f)';
        break;
      }
      default: {
        break;
      }
    }
    return background;
  }

  setBackGroundType() {
    const style = {
      'background-image': this.backgroundImage,
    };
    return style;
  }

  setBackGroundTypeDif(type: number) {
    const style = {
      'background-image': this.getBackGroundType(type),
    };
    return style;
  }

  setBackGroundError(comment: Comentarios) {
    let background = '';

    if (
      comment.comment_report === '' ||
      comment.comment_report === 'undefined' ||
      comment.comment_report == null
    ) {
      background = '#9a9a9a';
    } else {
      background = '#ff3535';
    }

    const style = {
      'background-color': background,
    };
    return style;
  }

  openNewTab(url: string) {
    window.open(url, '_blank');
  }

  openDialog(comment: Comentarios) {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '600px',
      height: '400px',
      disableClose: true,
      data: {
        comment,
        title: 'Reportar Mensaje',
        buttonText: {
          ok: 'Guardar',
          cancel: 'Cancelar',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
      }
    });
  }

  onContextMenu(event: MouseEvent, comment: Comentarios) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menu.focusFirstItem('mouse');
    this.commentMenuAux = comment;
    this.setPotableMsg(comment.potable);
    this.contextMenu.openMenu();
  }

  setPotableMsg(potable: number) {
    if (potable === 0) {
      this.potableMsg = 'Potable';
      this.potableTooltip = 'Este mensaje sera clasificado como Potable';
    } else {
      this.potableMsg = 'No Potable';
      this.potableTooltip = 'Este mensaje dejara de ser Potable';
    }
  }

  // tslint:disable-next-line: variable-name
  updateCommentPotable(reply_id: string, _id: string, potable: number) {
    // Necesitamos el indice del comentario para eliminarlo del DataSet
    const commentIndex = this.dataSource.data.findIndex(
      x => x._id === _id && x.id_reply === reply_id
    );

    // Actualizamos el valor de la fila
    this.dataSource.data[commentIndex].potable = potable;

    // Si la pagina de Potables se debe quitar la fila
    if (this.type === TypeComment.POTABLES) {
      this.dataSource.data.splice(commentIndex, 1);
    }

    // Recargamos el paginador y el sort
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  menuPotableAction(comment: Comentarios) {
    let potable = 0;
    // Definimos el nuevo valor del campo potable
    if (comment.potable === 1) {
      potable = 0;
    } else {
      potable = 1;
    }

    // Veo si actualizo las respuestas o las publicaciones
    if (comment.type === TypeCommentText.RESPUESTA) {
      this.fbPostService.updatePotableReply(
        comment._id,
        comment.id_reply,
        potable
      )
      .subscribe( res => {
        // Solo actualizo a nivel de front cuando se termino la actualizadon en la base
        this.updateCommentPotable(comment.id_reply, comment._id, potable);
      });
    } else {
      this.fbPostService.updatePotablePost(
        comment._id,
        comment.id_reply,
        potable
      )
      .subscribe( res => {
        // Solo actualizo a nivel de front cuando se termino la actualizadon en la base
        this.updateCommentPotable(comment.id_reply, comment._id, potable);
      });
    }
  }
}
