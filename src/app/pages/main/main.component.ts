import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SearchResult, TitleShow, Title } from './../../model/movie_get_res';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

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
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  Searchtitles: TitleShow | undefined;
  getID: any[] = [];
  Search: SearchResult[] = [];

  title: Title | undefined;
  titles: Title[] = [];
  gen: any[] = [];
  resultTitle: any;

  Startpage = 1;
  page: number = this.apiService.page;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.Searchtitles = await this.apiService.getFirstPage();
    this.resultTitle = this.Searchtitles.totalResults;
    this.resultTitle = Math.ceil(this.resultTitle / 10);

    this.Searchtitles.Search.forEach((SearchResult) => {
      this.getID.push(SearchResult.imdbID);
    });

    this.titles = await this.apiService.getMovieByIds(this.getID);
    this.titles.forEach((title) => {
      this.gen.push(title.Genre);
    });
    console.log(this.titles);
  }

  replaceGenre(item: any): string {
    return item && item.Genre ? item.Genre.replace(/,/g, ' • ') : '';
  }

  getNumbers(start: number, end: number): number[] {
    const numbers = [];
    if (end >= this.resultTitle) {
      end = this.resultTitle;
    }

    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }
    return numbers;
  }

  next() {
    this.Startpage = this.Startpage + 1;
  }

  prev() {
    if (this.Startpage != 1) {
      this.Startpage = this.Startpage - 1;
    }
  }

  async CallApiname(name: HTMLInputElement) {
    this.Startpage = 1;
    if (this.getID.length > 0) {
      this.getID = [];
    }

    this.Searchtitles = await this.apiService.getMovieByname(name.value);
    this.resultTitle = this.Searchtitles.totalResults;

    if (this.resultTitle > 1) {
      this.resultTitle = Math.ceil(this.resultTitle / 10);

      this.Searchtitles.Search.forEach((SearchResult) => {
        this.getID.push(SearchResult.imdbID);
      });

      this.titles = await this.apiService.getMovieByIds(this.getID);
    } else if (this.resultTitle === 1) {
      const singleResult = this.Searchtitles.Search[0];
      this.titles = await this.apiService.getMovieByIds([singleResult.imdbID]);
    }
  }

  async CallApiID(id: HTMLInputElement) {
    if (this.getID.length > 0) {
      this.getID = [];
    }
    this.titles.length = 0;
    this.resultTitle = 0;
    this.title = await this.apiService.getMovieByID(id.value);
  }
}
