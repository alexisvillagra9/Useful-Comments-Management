import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PaginaObjetivo } from '../../models/Objetivos/pagina-objetivo';
import { TargetPagesService } from 'src/app/services/target-pages/target-pages.service';

@Component({
  selector: 'app-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.css']
})
export class TargetTableComponent implements OnInit {

  displayedColumns: string[] = [
    'target_date_in',
    'target_link',
    'target_desc',
    'actions',
  ];

  // Seccion para crear correctamente las Tablas, Orden y Paginado
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<PaginaObjetivo>([]);

  loading = true;
  editingId = '';

  pageEditAux: PaginaObjetivo = new PaginaObjetivo();

  constructor(private targetPagesService: TargetPagesService) { }

  ngOnInit(): void {
    this.getPages();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPages() {
    const a = this.targetPagesService.getTargetPages().subscribe(
      res => {
        const finalDataSource = res as PaginaObjetivo[];
        this.loading = false;
        this.dataSource.data = finalDataSource;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error =>
        console.log('error')
    );
  }

  editPageEnable(page: PaginaObjetivo) {
    this.editingId = page._id;
    this.pageEditAux = page;
  }

  editCheck(page: PaginaObjetivo) {
    let check = false;
    if (page._id === this.editingId ) {
      check = true;
    } else {
      check = false;
    }
    return check;
  }

  editVisible() {
    let visible = true;
    if ( this.editingId === '') {
      visible = true;
    } else {
      visible = false;
    }
    return visible;
  }

  changeVisible(page: PaginaObjetivo) {
    let change = true;
    if ( this.editingId === page._id) {
      change = true;
    } else {
      change = false;
    }
    return change;
  }

  deletePage(page: PaginaObjetivo) {

  }

  savePageChanges(page: PaginaObjetivo) {
    this.editingId = '';
  }

  discardPageChanges(page: PaginaObjetivo) {
    this.editingId = '';
  }

  setBackGroundPage() {
    const style = {
      'background-color': '#0d47a1',
    };
    return style;
  }

  setBackGroundBut(typeButon: number) {
    let background = '';

    switch (typeButon) {
      case 1:
        background = '#28a745';
        break;
      case 2:
        background = '#9a9a9a';
        break;
      case 3:
        background = '#ff3535';
        break;
      default:
        break;
    }

    const style = {
      'background-color': background,
    };
    return style;
  }

}
