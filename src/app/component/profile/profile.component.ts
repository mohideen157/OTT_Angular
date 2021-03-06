import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showDiv = {
    previous : false,
    current : false,
    next : false
  }

  navigateTopage(page){
   
    this.router.navigate([page]);
  }

}
