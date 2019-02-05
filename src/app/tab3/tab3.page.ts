import { Component, OnInit } from '@angular/core';

import { EndpointService } from '../services/endpoint.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  votesArray: any = [];
  catVotedList: any = [];
  catListObj:any;
  catList:any;

  constructor(private endpointService: EndpointService){

  }

  ngOnInit(){

    this.votesArray = localStorage.getItem("votesArray");
    this.votesArray = (this.votesArray) ? JSON.parse(this.votesArray) : [];
    console.log("votesArray click vote: ", this.votesArray);

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
