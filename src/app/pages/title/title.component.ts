import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharedServiceService } from '../../services/shared-service.service';
import { ApiService } from '../../services/api.service';
import { Title } from '../../model/movie_get_res';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent implements OnInit{

  id: any;
  title: Title | undefined;
  Soure: any[] = [];
  rating: any[]= [];

  constructor(private active: ActivatedRoute, private router: Router, protected api: ApiService, protected shared: SharedServiceService){}

  ngOnInit(): void {
    this.id = this.active.snapshot.paramMap.get('id') || '';
    this.shared.check = true;
    this.loadData();
  }

  async loadData(){
    this.title = await this.api.getMovieByID(this.id);
    this.title.Ratings.forEach((rating) =>{
      this.Soure.push(rating.Source)
      this.rating.push(rating.Value)
    })

    console.log(this.Soure);
    console.log(this.rating);


  }

  back(){
    window.history.back();
  }
}
