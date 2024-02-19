import { Injectable } from '@angular/core';
import { SearchResult, TitleShow, Title } from '../model/movie_get_res';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  constructor(protected apiService: ApiService, private router: Router) {}

  public Searchtitles: TitleShow | undefined;
  public Search: SearchResult[] = [];

  public title: SearchResult | undefined;
  public titles: SearchResult[] = [];
  public result: any;

  public Startpage = 1;
  public pages = 1;

  public check = false;

  public type = ['movie', 'series', 'episode'];

  async CallApiname(name: string) {
    sessionStorage.setItem('nameSearch', name);
    this.Logic();
  }

  async CallApiID(id: string) {
    this.LogicID(id);
  }

  async CallApiType(type: string){
    sessionStorage.setItem('type', type);
    this.Logic();
  }

  async Logic(page?: number) {
    this.check = false;
    this.pages = page || 1;

    if (this.pages > 8) {
      this.Startpage = Math.max(this.pages - 5, 1);
    } else if (this.pages < 8) {
      this.Startpage = Math.max(this.pages - 5, 1);
    }

    if(sessionStorage.getItem('nameSearch')){
      console.log("เข้านะ");

      this.router.navigate([''], {
        queryParams: {
          name: sessionStorage.getItem('nameSearch')
        }
      })
    }

    if(this.pages >= 2){
      if(sessionStorage.getItem('nameSearch')){
        this.router.navigate([''], {
          queryParams: {
            name: sessionStorage.getItem('nameSearch'),
            page: page,
          }
        })
      } else {
        this.router.navigate([''], {
          queryParams: {
            page: page,
          }
        })
      }
    } else {
      if(sessionStorage.getItem('nameSearch')){
        this.router.navigate([''], {
          queryParams: {
            name: sessionStorage.getItem('nameSearch')
          }
        })
      } else {
        this.router.navigate(['']);
      }
    }

    this.titles = [];

    this.Searchtitles = await this.apiService.getPage(page || 1);
    this.result = this.Searchtitles.totalResults;
    this.result = Math.ceil(this.result / 10);

    this.titles = this.Searchtitles.Search;

    //Z - A
    // this.titles.sort((a , b ) => b.Title.localeCompare(a.Title));

    //A - Z
    // this.titles.sort((a , b) => a.Title.localeCompare(b.Title));
  }

  async LogicID(id: string) {
    this.pages = 1;
    this.titles = [];
    this.result = 0;

    this.title = await this.apiService.getMovieByID(id);
  }

  async LogicType(){

  }
}
