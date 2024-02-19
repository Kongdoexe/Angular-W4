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
    MatToolbarModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(protected sharedData: SharedServiceService){};

  CallAPiname(name: HTMLInputElement) {
    this.sharedData.CallApiname(name?.value);
  }

  CallAPiID(id: HTMLInputElement){
    this.sharedData.CallApiID(id.value);
  }

  CallApiType(type: HTMLSelectElement){
    this.sharedData.CallApiType(type.value);
  }

  CallBackApi(){
    sessionStorage.clear();
    this.sharedData.Logic();
  }


  getName() {
    return sessionStorage.getItem('nameSearch');
  }

}
