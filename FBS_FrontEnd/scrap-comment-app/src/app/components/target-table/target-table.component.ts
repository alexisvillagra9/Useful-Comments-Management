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

  pageEditCancelAux: PaginaObjetivo;

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

  addNewPageItem() {
    this.pushElementDataSource();
    this.editingId = '0';
  }

  pushElementDataSource() {
    this.dataSource.filteredData.push(new PaginaObjetivo('0', new Date()));
    this.dataSource.data = [...this.dataSource.data];
    // Debemos movernos a la ultima pagina
    setTimeout(() => {
      this.dataSource.paginator.lastPage();
    });
  }

  aaa() {
    console.log(this.dataSource.paginator.length,this.dataSource.paginator.pageSize,this.paginator.length);
  }

  editPageEnable(page: PaginaObjetivo) {
    this.editingId = page._id;
    this.pageEditCancelAux = Object.assign({}, page);
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
    this.dataSource.data.splice(this.findIndexById(page), 1);
    this.targetPagesService.deleteTargetPage(page._id);

    // Cargamos el datasource, sort y paginador
    this.dataSource.data = this.dataSource.data;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  savePageChanges(page: PaginaObjetivo) {
    // Si el id que se esta editando es 0 significa que es un nuevo items
    if (this.editingId === '0') {
      this.targetPagesService.insertTargetPage(page)
        .subscribe((res: any) => {
          this.dataSource.data[this.findIndexById(page)] = res;
        });
    } else {
      this.targetPagesService.updateTargetPage(page);
    }

    // Finalmente liberamos el editingId y la variable auxiliar
    this.editingId = '';
    this.pageEditCancelAux = Object.assign({}, new PaginaObjetivo());
  }

  discardPageChanges(page: PaginaObjetivo) {
    // Si es crear nuevo item se borra la fila, caso contrario se setea la variable auxiliar
    if (page._id === '0') {
      // Se borra el item
      this.dataSource.data.splice(this.findIndexById(page), 1);
    } else {
      // Actualizamos el valor del dataSource por lo que estaba Originalmente
      this.dataSource.data[this.findIndexById(page)] = this.pageEditCancelAux;
    }

    // Cargamos el datasource, sort y paginador
    this.dataSource.data = this.dataSource.data;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    // Liberamos el editingId y la variable auxiliar
    this.editingId = '';
    this.pageEditCancelAux = Object.assign({}, new PaginaObjetivo());
  }

  findIndexById(page: PaginaObjetivo) {
    const foundIndex = this.dataSource.data.findIndex(
      x => x._id === page._id);
    return foundIndex;
  }

  setBackGroundPage(color: string) {
    let col = '';

    if (color === '') {
      col = '#0d47a1'; // Color Primario;
    } else {
      col = color;
    }

    const style = {
      'background-color': col,
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
