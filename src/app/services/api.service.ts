import { HttpClient } from '@angular/common/http';
import { Constant } from './../config/constant';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SearchResult, TitleShow } from '../model/movie_get_res';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private constant: Constant, private http: HttpClient) {}

  url = this.constant.API_ENDPOINT;

  public async getAllPage(page?: number) {

    if(!page){
      page = 1;
    }

    const response = await firstValueFrom(this.http.get(this.url, {
      params: {
        s: 'movie',
        page: page!
      }
    }));

    return response as unknown as TitleShow;
  }

  public async getMovieByname(name: string){

    const response = await firstValueFrom(this.http.get(this.url, {
      params:{
        s: name 
      }
    }))

    return response as unknown as TitleShow;
  }

  public async getMovieByID(id: string){

    const response = await firstValueFrom(this.http.get(this.url, {
      params:{
        i: id,
        plot: 'fu;;'
      }
    }))

    return response as unknown as TitleShow;
  }
}