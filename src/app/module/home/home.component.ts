import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import  {RestUrlService} from '../../rest-url/rest-url.service';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  itemsPerSlide = 3;
  itemsPerSlideBanner = 1;
  singleSlideOffset = false;
  noWrap = false;
  selectedSrc:any='';
  slidesChangeMessage:any = '';
  showMovieScreen:boolean=false;
  showProcessing:boolean=false;
  activeSlideIndex = 0;
  options:any={};
  
  slides = [
    {image: 'assets/img/slider.png'},
    {image: 'assets/img/slider2.png'},
    {image: 'assets/img/slider3.png'},
    {image: 'assets/img/slider.png'},
    {image: 'assets/img/slider2.png'},
    {image: 'assets/img/slider3.png'},
    {image: 'assets/img/slider.png'},
    {image: 'assets/img/slider2.png'},
    {image: 'assets/img/slider3.png'}
  ];
  
 
  onSlideRangeChange(indexes: number[]): void {
    this.slidesChangeMessage = `Slides have been switched: ${indexes}`;
  }
  latestMovieList:any=[];
  constructor(private restUrlService:RestUrlService,private http:Http, private route: ActivatedRoute, private router: Router) { }

  trendingMovieList:any=[];
  ngOnInit(): void {
    localStorage.removeItem('entities_id');
    if(localStorage.getItem('userLoggedIn') == undefined || (localStorage.getItem('userLoggedIn') != undefined && localStorage.getItem('userLoggedIn') == 'false')){
      this.router.navigate(['index']);
    }

    

    //this.trendingMovieList=[{"id":1,"movie_name":"Asuran"},{"id":2,"movie_name":"Petta"},{"id":3,"movie_name":"Boss"}];

    this.getAllCategories();
    this.getAllPosters();
 
  }

  showMovie(src){
    src='/video'+src;
    this.options={ autoplay: true, controls: true, sources: [{ src: src, type: 'application/x-mpegURL'  }]}
    this.showMovieScreen=true;
  }

  cancel(event){
if(event=='false'){
 this.showMovieScreen=false;
  }
}

navigateTopage(page,id){
  localStorage.setItem("entities_id", id);
  localStorage.setItem("posters_id", id);
  this.router.navigate([page]);
}
categoriesList:any={};
getAllCategories(){   
 
  this.showProcessing=true;
  const joParams = {
 
  };
  this.http
      .get(
        this.restUrlService.getRestUrl().allCategories.url, joParams).subscribe(
          response => {
            this.showProcessing=false;
            this.categoriesList=response.json();
            
             });
}


postersList:any={};
getAllPosters(){   
 
  this.showProcessing=true;
  const joParams = {
 
  };
  this.http
      .get(
        this.restUrlService.getRestUrl().allPosters.url, joParams).subscribe(
          response => {
            this.showProcessing=false;
            this.postersList=response.json();
            //console.log(this.postersList);
            
             });

}


}
