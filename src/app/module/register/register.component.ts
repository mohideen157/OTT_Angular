import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import  {RestUrlService} from '../../rest-url/rest-url.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showForm1:any=true;
  showForm2:any=false;  
  showForm3:any=false;
  email:any='';
  mobile:any='';
  password:any='';
  name:any='';
  card_number:any='';
  expiry_date:any='';
  cvv:any='';
  model:any={};
  showProcessing:boolean=false;
 

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };     
    container.setViewMode('month');
  }

  
  constructor(private restUrlService:RestUrlService,private http:Http,private route: ActivatedRoute, private router: Router,public datepipe: DatePipe ) {}

  
  

  ngOnInit(): void {
    
    this.getAllplan();
  }
  showFirstForm()
  {
    this.showForm1=true;
    this.showForm2=false;
    this.showForm3=false;
   
  }
  showSecondForm(){
    this.showForm1=false;
    this.showForm3=false;
    this.showForm2=true;
  }

  showThirdForm(){
    this.showForm1=false;
    this.showForm2=false;
    this.showForm3=true;
  }

  checkForm(){
    var result=false;
    if(this.email != null && this.mobile != null && this.password != null){
      result=true;
    }
    return result;
  }

  insertId:any='';
  emailcheck:boolean=false;
  emailExist:boolean=false;
  register(){
    this.emailcheck=false;
    //this.emailExist=false;
    //this.showProcessing=true;
    const joParams = {
    "email":this.model.email,
    "mobile":this.model.mobile,
    "password":this.model.password
    };
    this.http
        .post(
          this.restUrlService.getRestUrl().register.url, joParams).subscribe(
            response => {
              var result=response.json();
            //  console.log("result::::",result);
              this.showProcessing=false;
              this.insertId=result.id;
              //console.log("id" +this.insertId);
             // this.emailcheck=result.email;

              //alert("result::::"+result);
            // this.showProcessing=false;
              //this.insertId=result.insertId;
              this.showForm1=false;
              this.showForm3=false;
              this.showForm2=true;
            },error =>{
              this.emailcheck=true;
              
            });
           
  }
  

  card(){
    this.showProcessing=true;   
    const joParams = {
    "userId":this.insertId,
    "name":this.model.name,
    "cardno":this.model.card_number,
    "expirydate":this.model.expiry_date,  
    "cvv":this.model.cvv
    };
    this.http
        .post(
          this.restUrlService.getRestUrl().card.url, joParams).subscribe(
            response => {
              this.showProcessing=false;
              this.model={};
              this.router.navigate(['index']);
              alert("New User successful register");
            });
  }

  btnSelected:any='';  
  planData:any={};
  date:any={};

     

  checkButton(btn,data){
   this.btnSelected=btn;
   this.planData=data;
   //console.log("btnselected::::",this.btnSelected);
  }
    plan(){
      //console.log("plan data::::",this.planData);
      //console.log("plan data_id::::",this.planData.id);
      //console.log("plan data_validitydays::::",this.planData.validitydays);
      

      
      let adddays = this.planData.validitydays;
      this.date = new Date();
      //console.log( adddays);
      this.date.setDate( this.date.getDate() + adddays);
     // console.log( this.date);
     
      //let value = (latest_date + adddays);
      //console.log(value);
      //this.date.setDate( this.date.getDate() + adddays);
      //console.log(this.date);
     
     
      this.showProcessing=true;
      const joParams = {
      "userId":this.insertId,
      "planId":this.planData.id,
      "expiryDate":this.date,
      "remainingDate":this.planData.validitydays,
      "paymentStatus":this.planData.planType,
      "isactive":1
      };
      this.http
          .post(
            this.restUrlService.getRestUrl().plan.url, joParams).subscribe(
              response => {
                this.showProcessing=false;
                this.model={};
                this.showForm1=false;
                this.showForm2=false;
                this.showForm3=true;
              });
    }
  
    navigateTopage(page){
      this.router.navigate([page]);
    }


planList:any={};
getAllplan(){   
 
 // this.showProcessing=true;
  const joParams = {
 
  };
  this.http
      .get(
        this.restUrlService.getRestUrl().Subscriptionplan.url, joParams).subscribe(
          response => {
           // this.showProcessing=false;
            this.planList=response.json();
            //console.log(this.postersList);
            
             });

}
    
}
