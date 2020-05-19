import { Component, OnInit } from '@angular/core';
import { TypeComment } from '../../models/enums';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  typeComment = TypeComment;

  constructor() { }

  ngOnInit(): void {
  }

}
