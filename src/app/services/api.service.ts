import { HttpClient } from '@angular/common/http';
import { Constant } from './../config/constant';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SearchResult, TitleShow, Title } from '../model/movie_get_res';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  pages: any;
  constructor(private constant: Constant, private http: HttpClient) {}

  url = this.constant.API_ENDPOINT;

  public async getMovieByIds(ids: string[], page?: number) {
    const moviePromises = ids.map(async (id) => {
      const response = await firstValueFrom(
        this.http.get(this.url, {
          params: {
            i: id,
            plot: 'movie',
            page: page || 1,
          },
        })
      );

      return response as Title;
    });

    const movies = await Promise.all(moviePromises);
    return movies;
  }

  public async getPage(page?: number) {
    const nameSearch = sessionStorage.getItem('nameSearch') || '';

    if (!nameSearch) {
      const response = await firstValueFrom(
        this.http.get(this.url, {
          params: {
            s: 'movie',
            page: page || 1,
          },
        })
      );
      console.log(response);

      return response as TitleShow;
    } else {
      const response = await firstValueFrom(
        this.http.get(this.url, {
          params: {
            s: nameSearch,
            plot: 'movie',
            page: page || 1,
          },
        })
      );

      return response as TitleShow;
    }
  }

  public async getMovieByID(id: string) {
    const response = await firstValueFrom(
      this.http.get(this.url, {
        params: {
          i: id,
          plot: 'full',
        },
      })
    );

    return response as Title;
  }
}
