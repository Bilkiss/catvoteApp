import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { EndpointService } from '../services/endpoint.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  votesArray: any = [];
  catVotedList: any = [];
  catListObj:any;
  catList:any;

  constructor(private endpointService: EndpointService, private storage: Storage){


  }

  ionViewWillEnter(){

    this.storage.get("votesArray").then( res => {
      console.log("votesArray res ", res);
      if(res){
        this.votesArray = res;
      } else {
        this.votesArray = [];
      }
    }, error => {
      console.log("votesArray res ", error);
      this.votesArray = [];
    });
    // this.votesArray = localStorage.getItem("votesArray");
    // this.votesArray = (this.votesArray) ? JSON.parse(this.votesArray) : [];
    console.log("votesArray onInit : ", this.votesArray);

    this.getListCat();

  }

  getListCat(){
    this.endpointService.getCats().subscribe( res => {
      this.catListObj = res;
      this.catList = this.catListObj.images;
      console.log("catList: ", this.catList);

      this.catVotedList = this.catList.filter( x => this.votesArray.includes(x.id));

      console.log("catVotedList: ", this.catVotedList);


    }, error => {
      console.log("Error: ", error);
    })
  }

}
