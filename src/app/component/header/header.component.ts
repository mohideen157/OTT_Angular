import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import  {RestUrlService} from '../../rest-url/rest-url.service';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showOtp:any=false;
  modalRef: BsModalRef;
  email:any='';
  model:any={};
  showProcessing:boolean=false;
  userLoggedIn:boolean;
  selectedTab:any='home';
  constructor(private restUrlService:RestUrlService,private http:Http,private modalService: BsModalService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.model.otp='8585';
  }

  navigateTopage(page){
    this.selectedTab=page;
    this.router.navigate([page]);
  }

  navigateTopageLogin(page){
    this.userLoggedIn=true;
    this.close();
    this.router.navigate([page]);
  }
  openModal(template: TemplateRef<any>) {
    this.showOtp=false;
    this.modalRef = this.modalService.show(template);
  }

  openTemplateOtp(){
    this.showOtp=true;
  }

  close(){
    this.modalRef.hide();
  }

  checkEmail(){   
    this.showProcessing=true;
    const joParams = {
    "email_id":this.model.email
    };
    this.http
        .post(
          this.restUrlService.getRestUrl().checkEmailExist.url, joParams).subscribe(
            response => {
              this.showProcessing=false;
              var result=response.json();
              console.log("emailExistRESULT:::",result);
              if(result.length > 0){
                  this.showOtp=true;      
              }
            });
  }

  logout(){
    this.userLoggedIn=false;
  }


}
