import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  showMovieScreen:boolean=false;
  options:any={};
  selectedSrc:any='';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  showMovie(src){
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

}
