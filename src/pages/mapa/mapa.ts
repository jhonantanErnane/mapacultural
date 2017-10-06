import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
declare var google;

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lat = -19.9758436;
  lng = -44.02022569999997;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbProvider: DatabaseProvider) {
  }

  ionViewDidLoad() {
    const component = this;
    this.loadMap(this.lat, this.lng);
    this.dbProvider.getAllLocations().subscribe((locais) => {
      locais.forEach((local) => {
        for (const key in local) {
          if (local.hasOwnProperty(key)) {
            console.log( local[key]);
            for (const key2 in local[key]) {
              if (local[key].hasOwnProperty(key2)) {
                console.log(local[key][key2]);

                const marker = new google.maps.Marker({
                  map: component.map,
                  position: { lat: local[key][key2].lat, lng: local[key][key2].long }
                });
              }
            }
          }
        }
      });
    });
  }



  loadMap(aLat, aLng) {
    // const latLng = new google.maps.LatLng(-19.932987, -43.971652);
    const latLng = new google.maps.LatLng(aLat, aLng);

    const mapOptions = {
      center: latLng,
      zoom: 14,
      mapTypeId: 'roadmap' // google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

}
