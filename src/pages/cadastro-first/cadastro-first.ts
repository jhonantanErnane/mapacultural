import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { AutocompletePage } from '../autocomplete/autocomplete';
// import { } from 'googlemaps';


@Component({
  selector: 'page-cadastro-first',
  templateUrl: 'cadastro-first.html',
})
export class CadastroFirstPage {
  address: any;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  // @ViewChild('search')
  // public searchElementRef: ElementRef;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    // , private mapsAPILoader: MapsAPILoader
    , private ngZone: NgZone
    , private modalCtrl: ModalController) {
    this.address = {
      place: ''
    };
  }
  showAddressModal() {
    const modal = this.modalCtrl.create(AutocompletePage);
    const me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
    });
    modal.present();
  }
  ngOnInit() {
    // this.searchControl = new FormControl();
    // // this.mapsAPILoader.load().then(() => {
    // const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //   types: ['address']
    // });
    // autocomplete.addListener('place_changed', () => {
    //   this.ngZone.run(() => {
    //     // get the place result
    //     const place: google.maps.places.PlaceResult = autocomplete.getPlace();

    //     // verify result
    //     if (place.geometry === undefined || place.geometry === null) {
    //       return;
    //     }

    //     // set latitude, longitude and zoom
    //     this.latitude = place.geometry.location.lat();
    //     this.longitude = place.geometry.location.lng();
    //     this.zoom = 12;
    //   });
    // });
    // // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroFirstPage');
  }

}
