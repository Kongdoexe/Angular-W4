import { Component, OnInit } from '@angular/core';
import { SearchResult, TitleShow } from '../../model/movie_get_res';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainComponent } from '../main/main.component';
import { SharedServiceService } from '../../services/shared-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    MatToolbarModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  movieName: string = '';
  searchResults: TitleShow | undefined;
  isSearchResultsVisible: boolean = false;
  Results: any[] = [];

  constructor(protected sharedData: SharedServiceService, private router: Router, private api: ApiService){};

  CallAPiname(name: HTMLInputElement) {
    this.sharedData.CallApiname(name?.value);
  }

  CallApiID(id: HTMLInputElement){
    if (id && id.value) {
      this.sharedData.CallApiID(id.value);
    } else {
      console.error("ID is undefined or empty. Unable to call API.");
    }
  }

  CallApiType(type: HTMLSelectElement){
    this.sharedData.CallApiType(type.value);
  }

  CallBackApi(){
    this.sharedData.titles = [];
    sessionStorage.clear();
    this.router.navigate(['']);

    if(!this.sharedData.check){
      this.sharedData.Logic();
    }
  }

  async updateRealTimeData(name: any) {
    this.searchResults = await this.api.getMovieSearch(name.value);
    this.isSearchResultsVisible = true;
    if(this.searchResults.Response){
      this.Results = this.searchResults.Search
    }
  }

  onInputFieldClick() {
    if(this.searchResults){
      this.isSearchResultsVisible = true;
    }
  }

  onInputFieldBlur() {

    if(this.Results.length > 0){
      setTimeout(() => {
        this.isSearchResultsVisible = false;
      }, 100);
    }

  }

  onSearchResultClick(result: any) {

    sessionStorage.setItem('nameSearch', result.Title)
    this.isSearchResultsVisible = false;
    this.sharedData.Logic();
  }

  getName() {
    return sessionStorage.getItem('nameSearch');
  }

}
