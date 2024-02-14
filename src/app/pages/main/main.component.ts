import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SearchResult, TitleShow } from './../../model/movie_get_res';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  titles: TitleShow | undefined;
  Search: SearchResult[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {

    this.titles = await this.apiService.getAllPage();
    this.Search = this.titles.Search;
    console.log(this.Search);

  }

  async callApi() {
    //Test
    this.titles = await this.apiService.getAllPage();
    this.Search = this.titles.Search;
    console.log(this.Search);
    
  }

  async CallApiname(name: HTMLInputElement) {

    this.titles = await this.apiService.getMovieByname(name.value);
    this.Search = this.titles.Search;
    console.log(this.Search);

  }

  async CallApiID(id: HTMLInputElement) {

    this.titles = await this.apiService.getMovieByID(id.value);
    this.Search = this.titles.Search;
    console.log(this.Search);

  }
}
