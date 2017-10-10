import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Geolocation } from '@ionic-native/geolocation';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private dbProvider: DatabaseProvider,
    private geolocation: Geolocation) {
  }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
     }).catch((error) => {
      alert('Não foi possivel obter sua localização');
      console.log(error.message);
     });
  }

  ionViewWillEnter() {
    setTimeout( () => {
      const component = this;
      this.loadMap(this.lat, this.lng);
      this.dbProvider.getAllLocations().subscribe((locais) => {
        // console.log(locais);
        locais.forEach((local) => {
          // console.log(local);
          for (const key in local) {
            if (local.hasOwnProperty(key)) {
              // console.log( local[key]);
              // for (const key2 in local[key]) {
              //   if (local[key].hasOwnProperty(key2)) {
              //     console.log(local[key][key2]);

                  const marker = new google.maps.Marker({
                    map: component.map,
                    position: { lat: local[key].lat, lng: local[key].long }
                  });
                  // console.log(marker);
                  const infoWindow = new google.maps.InfoWindow({
                    content: `<h5>${local[key].nome}</h5>
                              <p>${local[key].desc}</p>
                              <img border="0" align="Left" width:50%; src="${local[key].foto}">
                    `
                    // <img border="0" align="Left" src="stagleton.jpg">
                  });

                  marker.addListener('click', function() {
                    infoWindow.open(component.map, marker);
                  });
              //   }
              // }
            }
          }
        });
      });
    }, 500);
  }

  // ionViewDidEnter() {

  // }



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
