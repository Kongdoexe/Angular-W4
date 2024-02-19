import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SearchResult, TitleShow, Title } from './../../model/movie_get_res';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { SharedServiceService } from '../../services/shared-service.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    NgIf,
    NgFor
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  constructor(public apiService: ApiService, private router: Router, protected sharedData: SharedServiceService) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.sharedData.Logic();
  }

  replaceGenre(item: any): string {
    return item && item.Genre ? item.Genre.replace(/,/g, ' • ') : '';
  }

  getNumbers(start: number, end: number): number[] {
    const numbers = [];
    if (end >= this.sharedData.result) {
      end = this.sharedData.result;
    }

    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }
    return numbers;
  }

  next() {
    this.sharedData.Startpage = this.sharedData.Startpage + 1;
  }

  prev() {
    if (this.sharedData.Startpage != 1) {
      this.sharedData.Startpage = this.sharedData.Startpage - 1;
    }
  }

  async navigate(page: any){
    this.sharedData.Logic(page);
  }
}
