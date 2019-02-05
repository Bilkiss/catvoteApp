import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { EndpointService } from '../services/endpoint.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  catListObj:any;
  catList:any = [];
  currentVote: number = 0;
  currentDisplayCat1 = 0;
  currentDisplayCat2 = 1;
  votesArray: any = [];

  constructor(private endpointService: EndpointService, private storage: Storage) {
    // this.votesArray = this.storage.get("votesArray");
    this.storage.get("votesArray").then( res => {
      console.log("votesArray res ", res);
      if(res){
        this.votesArray = res;
      }
    }, error => {
      console.log("votesArray res ", error);
    });
    console.log("this.votesArray const~~~ ", this.votesArray);
    if (!this.votesArray) this.storage.set("votesArray","[]");
  }

  ngOnInit(){


    this.storage.get("currentVoteIndex").then( res => {
      console.log("currentVoteIndex res ", res);
      // this.currentVoteStorage = res;
      if(res){
        this.currentVote = res;
        this.currentDisplayCat1 = this.currentVote * 2;
        this.currentDisplayCat2 = this.currentDisplayCat1 + 1;
      } else {
        this.currentVote = 0;
      }
    }, error => {
      console.log("currentVoteIndex res ", error);
      this.currentVote = 0;
    });
    console.log("currentVote onINIT: ", this.currentVote);

    this.currentDisplayCat1 = this.currentVote * 2;
    this.currentDisplayCat2 = this.currentDisplayCat1 + 1;
    this.getListCat();
  }


  getListCat(){
    this.endpointService.getCats().subscribe( res => {
      this.catListObj = res;
      this.catList = this.catListObj.images;
      console.log("catList: ", this.catList);

    }, error => {
      console.log("Error: ", error);
    })
  }
  clickVote(ID){
    // console.log("Clickvote id: ", ID);

    this.endpointService.voteCat(ID).subscribe( res => {
      console.log("Res cat vote ", res);
    }, error =>{
      console.log("Error cat vote ", error);
    });

    // this.votesArray = this.storage.get("votesArray");
    console.log("votesArray click vote: ", this.votesArray);
    this.votesArray = (this.votesArray) ? this.votesArray : [];
    // this.votesArray = (this.votesArray) ? JSON.parse(this.votesArray) : [];
    if (!this.votesArray.includes(ID)) this.votesArray.push(ID);
    this.storage.set("votesArray", this.votesArray);

    this.currentVote += 1;
    console.log("currentVote onclick: ", this.currentVote);
    this.storage.set("currentVoteIndex", this.currentVote);
    this.currentDisplayCat1 = this.currentVote * 2;
    this.currentDisplayCat2 = this.currentDisplayCat1 + 1;

  }

}
