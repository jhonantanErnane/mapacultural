import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ViewController } from 'ionic-angular';
declare var google;

@Component({
  templateUrl: './autocomplete.html'
})

export class AutocompletePage {
  autocompleteItems;
  autocomplete;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  // una
  item: {endereco: string, lat: number; long: number} = {endereco: null, lat: null, long: null};
  lat = -19.9758436;
  lng = -44.02022569999997;
  service = new google.maps.places.AutocompleteService();

  constructor(public viewCtrl: ViewController
    , private zone: NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  ionViewDidLoad() {
    console.log('teste');
    this.loadMap(this.lat, this.lng);
  }
  loadMap(aLat, aLng) {
    // const latLng = new google.maps.LatLng(-19.932987, -43.971652);
    const latLng = new google.maps.LatLng(aLat, aLng);

    const mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: 'roadmap' // google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
  dismiss() {
    this.viewCtrl.dismiss();
    return false;
  }

  chooseItem(item: any) {
    const component = this;
    const geocoder = new google.maps.Geocoder();
    component.item.endereco = item;
    geocoder.geocode({ 'address': item }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(results[0].geometry.location.lat());
        console.log(results[0].geometry.location.lng());
        component.item.lat = results[0].geometry.location.lat();
        component.item.long = results[0].geometry.location.lng();
        console.log(status);
        // component.loadMap(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        // //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
        component.map.setCenter(results[0].geometry.location);
        const marker = new google.maps.Marker({
          map: component.map,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });

    this.autocomplete.query = item;
    this.autocompleteItems = [];
    console.log(item);
  }

  updateSearch() {
    if (this.autocomplete.query === '') {
      this.autocompleteItems = [];
      return;
    }
    const me = this;
    this.service.getPlacePredictions(
      {
        input: this.autocomplete.query
        , componentRestrictions: { country: 'BR' }
      }
      , function (predictions, status) {
        me.autocompleteItems = [];
        if (predictions !== null) {
          me.zone.run(function () {
            predictions.forEach(function (prediction) {
              me.autocompleteItems.push(prediction.description);
            });
          });
        }
      });
  }

  confirmar() {
    this.viewCtrl.dismiss(this.item);
  }
}
