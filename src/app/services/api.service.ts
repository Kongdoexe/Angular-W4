import { HttpClient } from '@angular/common/http';
import { Constant } from './../config/constant';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SearchResult, TitleShow , Title } from '../model/movie_get_res';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private constant: Constant, private http: HttpClient) {}

  url = this.constant.API_ENDPOINT;

  page: number = 1;

  public async getMovieByIds(ids: string[]) {
    const moviePromises = ids.map(async (id) => {
      const response = await firstValueFrom(this.http.get(this.url, {
        params: {
          i: id,
          plot: 'movie'
        }
      }));

      return response as Title;
    });

    const movies = await Promise.all(moviePromises);
    return movies;
  }

  public async getFirstPage(page?: number) {

    const response = await firstValueFrom(this.http.get(this.url, {
      params: {
        s: 'movie',
        page: page || 1
      }
    }));

    return response as TitleShow;
  }

  public async getMovieByname(name: string){

    const response = await firstValueFrom(this.http.get(this.url, {
      params:{
        s: name
      }
    }))
    console.log(response);

    return response as TitleShow;
  }

  public async getMovieByID(id: string){

    const response = await firstValueFrom(this.http.get(this.url, {
      params:{
        i: id,
        plot: 'full'
      }
    }))
    console.log(response);


    return response as Title;
  }
}
