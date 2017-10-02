import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { AutocompletePage } from '../autocomplete/autocomplete';
import { DatabaseProvider } from '../../providers/database/database';
// import { } from 'googlemaps';
import { Camera } from '@ionic-native/camera';


@Component({
  selector: 'page-cadastro-first',
  templateUrl: 'cadastro-first.html',
})
export class CadastroFirstPage {
  address: { place: string; };
  categorias: any;
  categoriaSelecionada: any;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  nome: string;
  desc: string;
  public localPicture: string = null;
  // @ViewChild('search')
  // public searchElementRef: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ngZone: NgZone
    , private modalCtrl: ModalController, private providerdb: DatabaseProvider, private cameraPlugin: Camera) {
  // , private mapsAPILoader: MapsAPILoader) {
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
    this.providerdb.getAllCategories().subscribe((categories) => {
      this.categorias = categories;
      console.log(this.categorias);
      console.log(categories);
    });
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

  takePicture(): void {
    this.cameraPlugin.getPicture({
    quality : 95,
    destinationType : this.cameraPlugin.DestinationType.DATA_URL,
    sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
    allowEdit : true,
    encodingType: this.cameraPlugin.EncodingType.PNG,
    targetWidth: 500,
    targetHeight: 500,
    saveToPhotoAlbum: true
    }).then(imageData => {
    this.localPicture = imageData;
    }, error => {
    console.log('ERROR -> ' + JSON.stringify(error));
    });
    }

  cadastrar() {
    // console.log(this.categoriaSelecionada.$value);
    // console.log(this.nome);
    // console.log(this.address.place);
    // console.log(this.desc);
    if (this.localPicture !== null) {
      this.providerdb.postNewFoto(this.categoriaSelecionada.$value, this.nome, this.localPicture)
      .then((success) => {
        console.log('Cadastro Realizado com sucesso');
      }, (error) => {
        console.log('Erro ao cadastrar');
      });
    }
    this.providerdb.postNewPlace(this.categoriaSelecionada.$value, this.nome, 23423, 23423423, this.desc)
    .then((success) => {
      console.log('Cadastro Realizado com sucesso');
    }, (error) => {
      console.log('Erro ao cadastrar');
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroFirstPage');
  }
}
