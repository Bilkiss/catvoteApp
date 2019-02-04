import { Component, OnInit } from '@angular/core';

import { EndpointService } from '../services/endpoint.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  catListObj:any;
  catList:any = [];
  currentVote: number;
  currentDisplayCat1 = 0;
  currentDisplayCat2 = 1;
  votesArray: any = [];

  constructor(private endpointService: EndpointService) {
    this.votesArray = localStorage.getItem("votesArray");
    if (!this.votesArray) localStorage.setItem("votesArray","[]");
  }

  ngOnInit(){
    let currentVoteStorage = localStorage.getItem("currentVoteIndex");
    this.currentVote = (currentVoteStorage) ? parseInt(currentVoteStorage) : 0;
    console.log("currentVote onINIT: ", this.currentVote);

    this.currentDisplayCat1 = this.currentVote * 2;
    this.currentDisplayCat2 = this.currentDisplayCat1 + 1;
    this.getListCat();
  }


  getListCat(){
    this.endpointService.getCats().subscribe( res => {
      this.catListObj = res;
      this.catList = this.catListObj.images;
      // console.log("catList: ", this.catList);

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

    this.votesArray = localStorage.getItem("votesArray");
    console.log("votesArray click vote: ", this.votesArray);
    this.votesArray = (this.votesArray) ? JSON.parse(this.votesArray) : [];
    if (!this.votesArray.includes(ID)) this.votesArray.push(ID);
    localStorage.setItem("votesArray", JSON.stringify(this.votesArray));

    this.currentVote += 1;
    console.log("currentVote onclick: ", this.currentVote);
    localStorage.setItem("currentVoteIndex", JSON.stringify(this.currentVote));
    this.currentDisplayCat1 = this.currentVote * 2;
    this.currentDisplayCat2 = this.currentDisplayCat1 + 1;

  }

}
