import { SearchResult } from './../../model/movie_get_res';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Title, TitleShow } from '../../model/movie_get_res';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  titles: any = [];
  searchResults: any = [];

  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(){
    //loadData เวลาเข้าหน้ามา
    const loadData = await this.ApiService.getAllPage();

    this.searchResults = loadData.Search;
    console.log(this.searchResults);
  }

  async callApi() {
    //Test
    const titleShowResponse = await this.ApiService.getAllPage();

    this.searchResults = titleShowResponse.Search;
  }

  async CallApiname(name: HTMLInputElement){
    const titleShowByname = await this.ApiService.getMovieByname(name.value);

    this.searchResults = titleShowByname.Search;
  }

  async CallApiID(id: HTMLInputElement) {

    const titleShowByid = await this.ApiService.getMovieByID(id.value);
    console.log(titleShowByid);

    this.titles = titleShowByid;
  }
}
