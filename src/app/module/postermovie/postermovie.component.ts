import { Component, OnInit } from '@angular/core';
import { RestUrlService } from '../../rest-url/rest-url.service';
import { Http } from '@angular/http';
import { HttpParams,HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postermovie',
  templateUrl: './postermovie.component.html',
  styleUrls: ['./postermovie.component.scss']
})
export class PostermovieComponent implements OnInit {

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
   
    if(localStorage.getItem('posters_id') ){
     this.entityId=localStorage.getItem('posters_id')
     console.log(this.entityId);
    }
    this.getAllposter();
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

 
getAllposter(){   

  //this.showProcessing=true;
  //let params = new HttpParams();    
  this.httpClient
      .get(
        this.restUrlService.getRestUrl().posters.url+'/'+this.entityId,).subscribe(
          response => {
           
            //this.showProcessing=false;
            this.entitiesList=response;
           // console.log(this.entityId);
            this.entityId=this.entitiesList.id;
            //console.log(this.entitiesList);
            //console.log(this.entityId);
             });

}


}