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
  lat: number = 51.678418;
  lng: number = 7.809007;
  service = new google.maps.places.AutocompleteService();

  constructor(public viewCtrl: ViewController, private zone: NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  ionViewDidLoad() {
    console.log('teste');
    this.loadMap();
  }
  loadMap() {
    const latLng = new google.maps.LatLng(-34.9290, 138.6010);

    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
  dismiss() {
    this.viewCtrl.dismiss();
    return false;
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
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
        me.zone.run(function () {
          predictions.forEach(function (prediction) {
            me.autocompleteItems.push(prediction.description);
          });
        });
      });
  }
}
