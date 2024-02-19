import { HttpClient } from '@angular/common/http';
import { Constant } from './../config/constant';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SearchResult, TitleShow, Title } from '../model/movie_get_res';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  pages: any;
  // plot: any;
  constructor(private constant: Constant, private http: HttpClient) {}

  url = this.constant.API_ENDPOINT;

  public async getMovieByIds(ids: string[], page?: number) {
    const plot = sessionStorage.getItem('type') || 'movie';
    const moviePromises = ids.map(async (id) => {
      const response = await lastValueFrom(
        this.http.get(this.url, {
          params: {
            i: id,
            type: plot,
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
    const plot = sessionStorage.getItem('type') || 'movie';
    const nameSearch = sessionStorage.getItem('nameSearch') || '';

    if (!nameSearch) {
      const response = await lastValueFrom(
        this.http.get(this.url, {
          params: {
            s: plot,
            page: page || 1,
          },
        })
      );

      return response as TitleShow;
    } else {
      if(sessionStorage.getItem('type')){
        const response = await lastValueFrom(
          this.http.get(this.url, {
            params: {
              s: nameSearch,
              type: plot,
              page: page || 1,
            },
          })
        );

        return response as TitleShow;
      } else {
        const response = await lastValueFrom(
          this.http.get(this.url, {
            params: {
              s: nameSearch,
              page: page || 1,
            },
          })
        );

        return response as TitleShow;
      }
    }

  }

  public async getMovieByID(id: string) {
    const response = await lastValueFrom(
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
