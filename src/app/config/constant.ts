import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Constant {
  public readonly API_ENDPOINT: string = 'https://www.omdbapi.com/?apikey=766747b8';

}
