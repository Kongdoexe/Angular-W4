import { Injectable } from '@angular/core';
import { SearchResult, TitleShow, Title } from '../model/movie_get_res';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  constructor(protected apiService: ApiService) {}

  public Searchtitles: TitleShow | undefined;
  public getID: any[] = [];
  public Search: SearchResult[] = [];

  public title: Title | undefined;
  public titles: Title[] = [];
  public gen: any[] = [];
  public result: any;

  public Startpage = 1;
  public pages = 1;

  public type = ['movie', 'series', 'episode'];

  async CallApiname(name: string) {
    sessionStorage.setItem('nameSearch', name);
    this.Logic();
  }

  async CallApiID(id: string) {
    this.LogicID(id);
  }

  async Logic(page?: number) {
    this.pages = page || 1;

    if (this.pages > 8) {
      this.Startpage = Math.max(this.pages - 5, 1);
    } else if (this.pages < 8) {
      this.Startpage = Math.max(this.pages - 5, 1);
    }

    this.titles = [];
    this.getID = [];
    this.gen = [];

    this.Searchtitles = await this.apiService.getPage(page || 1);
    this.result = this.Searchtitles.totalResults;
    this.result = Math.ceil(this.result / 10);

    this.Searchtitles.Search.forEach((SearchResult) => {
      this.getID.push(SearchResult.imdbID);
    });

    this.titles = await this.apiService.getMovieByIds(this.getID);
    this.titles.forEach((title) => {
      this.gen.push(title.Genre);
    });

    //Z - A
    // this.titles.sort((a , b ) => b.Title.localeCompare(a.Title));

    //A - Z
    // this.titles.sort((a , b) => a.Title.localeCompare(b.Title));
  }

  async LogicID(id: string) {
    this.pages = 1;
    this.titles = [];
    this.getID = [];
    this.gen = [];
    this.result = 0;

    this.title = await this.apiService.getMovieByID(id);
  }
}
