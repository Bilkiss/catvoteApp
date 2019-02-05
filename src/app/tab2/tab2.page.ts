import { Component } from '@angular/core';

import { EndpointService } from '../services/endpoint.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  catListObj:any;
  catList:any;

  constructor(private endpointService: EndpointService){

  }

  ionViewWillEnter(){
    this.getListCat();
  }

  getListCat(){
    this.endpointService.getCats().subscribe( res => {
      this.catListObj = res;
      this.catList = this.catListObj.images;
      console.log("catList: ", this.catList);
      if(this.catList.length >0){
        this.sortCatByScore();
      }

    }, error => {
      console.log("Error: ", error);
    })
  }

  sortCatByScore(){
    this.catList.sort((a,b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0));
  }

}
