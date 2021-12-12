import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { RestUrlService } from '../../rest-url/rest-url.service';
import { Http } from '@angular/http';
import { HttpParams,HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]

})
export class MylistComponent implements OnInit {
  isDropup = true;


  showMovieScreen:boolean=false;
  options:any={};
  selectedSrc:any='';
  constructor(private restUrlService:RestUrlService,private http:Http,private httpClient:HttpClient, private route: ActivatedRoute, private router: Router) { }
  id:any='';
  ngOnInit(): void {
    if(localStorage.getItem('id') ){
      this.id=localStorage.getItem('id')
      console.log(this.id);
     }
     this.getmylist();
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

navigateTopage(page){
  this.router.navigate([page]);
}





//resources:any={};
value:any={};
entitylist:any={};
getmylist(){   
   
  this.http
      .get(
        this.restUrlService.getRestUrl().mylistbyid.url+'/'+this.id,).subscribe(
          response => {
           //console.log(response);
           let res=response.json();
           //console.log(res);
           for (var val of res){
            //console.log(val);
            let resources=val;
            //console.log(resources);
            this.value=resources["id"];
            console.log(this.value);


            this.httpClient
            .get(
              this.restUrlService.getRestUrl().entities.url+'/'+ this.value,).subscribe(
                response => {
                   this.entitylist = response;
                  console.log(this.entitylist);
                   });
           //this.resources = res[val];
           //this.resources=res[0]
           //console.log(this.resources);
          }
             });

}



}
