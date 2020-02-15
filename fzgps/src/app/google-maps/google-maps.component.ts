import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { google } from 'google-maps';
import * as $ from "jquery";
import { GpsService } from '../providers/gps.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {

  @ViewChild("map", { static: false }) mapElement: ElementRef;

  map: any;
  coords: any;
  mapOptions: any;
  locationArray: any;
  marker: any = null;

  numDeltas: number = 100;
  delay: number = 10;
  i: number = 0;
  deltaLat: any;
  deltaLng: any;


  constructor(private gpsService:GpsService) {
    this.locationArray = [];
    // this.locationArray = [
    //   { 'lat': 12.120000, 'lang': 76.680000 },
    //   { 'lat': 24.879999, 'lang': 74.629997 },
    //   { 'lat': 16.994444, 'lang': 73.300003 },
    //   { 'lat': 19.155001, 'lang': 72.849998 },
    //   { 'lat': 24.794500, 'lang': 73.055000 },
    //   { 'lat': 21.250000, 'lang': 81.629997 }
    // ];
    // console.log("ss",this.locationArray);
  }

  ngOnInit() {
    setInterval(function () {
      $("*").each(function () {
        if ($(this).css("zIndex") == 100) {
          $(this).css("zIndex", "-100");
        }
        if ($(this).css("borderRadius") == '5px' && $(this).css("zIndex") == 1) {
          $(this).css("zIndex", "-1");
        }
      })
    }, 10);

    this.gpsService.getMapDatas().subscribe(data=>{
      this.locationArray = data;
      console.log('locationArray',this.locationArray);
      this.setupMap();
    });
  }
  ngAfterViewInit() {
    this.setupMap();
  }

  setupMap(){
    let mapOptions: google.maps.MapOptions = {
      center: this.coords,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.HYBRID
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.autoUpdate(this.locationArray);
  }

  autoUpdate(locationArray) {
    var self = this;
    // let num = Math.floor(Math.random() * 5) + 1;
    if(this.locationArray.length>0){
      let newPoint = new google.maps.LatLng(locationArray[0]['lat'], locationArray[0]['lang']);
      if (this.marker) {
        
        // Marker already created - Move it
        this.marker.setPosition(newPoint);
      }else {
        // Marker does not exist - Create it
        this.marker = new google.maps.Marker({
          position: newPoint,
          map: this.map
        });
      }
      // Center the map on the new position
      self.map.setCenter(newPoint);
      // Call the autoUpdate() function every 5 seconds
      setTimeout(function(){
        self.autoUpdate(self.locationArray);
      },5000);
    }
  }

}
