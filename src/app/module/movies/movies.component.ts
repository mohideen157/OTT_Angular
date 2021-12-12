import { Component, OnInit } from '@angular/core';
import { RestUrlService } from '../../rest-url/rest-url.service';
import { Http } from '@angular/http';
import { HttpParams,HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

  export class MoviesComponent implements OnInit {
    itemsPerSlide = 3;
    itemsPerSlideBanner = 1;
    singleSlideOffset = false;
    noWrap = false;
    selectedSrc:any='';
    slidesChangeMessage:any = '';
    showMovieScreen:boolean=false;
    activeSlideIndex = 0;
    options:any={};
    slides = [
      {image: 'assets/img/slider.png'},
      {image: 'assets/img/slider.png'},
      {image: 'assets/img/slider.png'}
    ];
   
    onSlideRangeChange(indexes: number[]): void {
      this.slidesChangeMessage = `Slides have been switched: ${indexes}`;
    }
    latestMovieList:any=[];
    constructor(private restUrlService:RestUrlService,private http:Http,private httpClient:HttpClient, private route: ActivatedRoute, private router: Router) { }
    entityId:any='';
    ngOnInit(): void {
      if(localStorage.getItem('userLoggedIn') == undefined || (localStorage.getItem('userLoggedIn') != undefined && localStorage.getItem('userLoggedIn') == 'false')){
        this.router.navigate(['index']);
      }
      if(localStorage.getItem('entities_id') ){
       this.entityId=localStorage.getItem('entities_id')
       console.log(this.entityId);
      }
      this.getAllentities();
    }
  
    showMovie(src){
      src='/video'+src;
      this.options={ autoplay: true, controls: true, sources: [{ src: src, type: 'application/x-mpegURL' }]}
      this.showMovieScreen=true;
    }
  
    cancel(event){
  if(event=='false'){
   this.showMovieScreen=false;
    }
  }
  
  navigateTopage(page){
    this.router.navigate([page]);
  }
  entitiesList:any={};

   
  getAllentities(){   
 
    //this.showProcessing=true;
    //let params = new HttpParams();    
    this.httpClient
        .get(
          this.restUrlService.getRestUrl().entities.url+'/'+this.entityId,).subscribe(
            response => {
             
              //this.showProcessing=false;
              this.entitiesList=response;
              //console.log(this.entityId);
              this.entityId=this.entitiesList.id;
              //console.log(this.entitiesList);
              //console.log(this.entityId);
               });
  
  }
  
  
  }