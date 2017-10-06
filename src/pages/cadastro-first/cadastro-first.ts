import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { AutocompletePage } from '../autocomplete/autocomplete';
import { DatabaseProvider } from '../../providers/database/database';
// import { } from 'googlemaps';
import { Camera } from '@ionic-native/camera';
import { LoadingProvider } from '../../providers/loading/loading';
import { MenuPage } from '../menu/menu';


@Component({
  selector: 'page-cadastro-first',
  templateUrl: 'cadastro-first.html',
})
export class CadastroFirstPage {
  fotoOk= false;
  MostrandoLoading: boolean;
  erro: boolean;
  address: { place: string; };
  categorias: any;
  categoriaSelecionada: any;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  nome: string;
  desc: string;
  localPicture: string = null;
  contLoading= 0;
  // @ViewChild('search')
  // public searchElementRef: ElementRef;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , private ngZone: NgZone
    , private loading: LoadingProvider
    , private modalCtrl: ModalController, private providerdb: DatabaseProvider, private cameraPlugin: Camera) {
    // , private mapsAPILoader: MapsAPILoader) {
    this.address = {
      place: ''
    };
  }
  showAddressModal() {
    setTimeout(() => {
      const modal = this.modalCtrl.create(AutocompletePage);
      const me = this;
      modal.onDidDismiss(data => {
        if (data) {
          this.address.place = data.endereco;
          this.latitude = data.lat;
          this.longitude = data.long;
          console.log(data);
        }
      });
      modal.present();
    }, 100);
  }
  ngOnInit() {
    this.loading.presentLoadingDefault('Carregando...');
    this.providerdb.getAllCategories().subscribe((categories) => {
      this.loading.hideLoadingDefault();
      this.categorias = categories;
      // console.log(categories);
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
      quality: 95,
      destinationType: this.cameraPlugin.DestinationType.DATA_URL,
      sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.localPicture = imageData;
      this.fotoOk = true;
    }, error => {
      console.log('ERROR -> ' + JSON.stringify(error));
    });
  }

  cadastrar() {
    if (this.localPicture !== null) {
      this.GravarFoto();
    }
    this.GravarDados();
  }

  GravarDados() {
    this.contLoading++;
    this.semaforoLoading();
    this.providerdb.postNewPlace(this.categoriaSelecionada.$value, this.nome, this.latitude, this.longitude, this.desc)
    .then((success) => {
      this.contLoading--;
      this.semaforoLoading();
      console.log('Cadastro Realizado com sucesso');
    }, (error) => {
      this.contLoading--;
      this.semaforoLoading();
      console.log('Erro ao cadastrar');
    });
  }

  GravarFoto () {
    this.contLoading++;
    this.semaforoLoading();
    this.providerdb.postNewFoto(this.categoriaSelecionada.$value, this.nome, this.localPicture)
    .then((success) => {
      this.contLoading--;
      this.semaforoLoading();
      console.log('Cadastro Realizado com sucesso');
    }, (error) => {
      this.contLoading--;
      this.semaforoLoading();
      console.log('Erro ao cadastrar');
    });
  }
  semaforoLoading() {
    if (this.contLoading > 0  && (!this.MostrandoLoading)) {
      this.MostrandoLoading = true;
      return this.loading.presentLoadingDefault('Salvando Dados...');
    }
    if (this.contLoading === 0) {
      this.loading.hideLoadingDefault();
      this.MostrandoLoading = false;
      this.navCtrl.setRoot(MenuPage);
    }
  }

  // semaforoErro() {

  // }

  // loadingCtrler(aSemaforo: number, aErro?: boolean) {
  //   if (this.erro && aErro) {
  //     this.erro = aErro;
  //   }
  //   this.contLoading += aSemaforo;
  //   if (this.contLoading === 0) {
  //     this.loading.hideLoadingDefault();
  //   } else {
  //     return this.loading.presentLoadingDefault('Salvando Dados...');
  //   }
  //   if (this.contLoading && this.erro) {
  //     alert('Erro ao salvar os dados');
  //   } else {
  //     // this.navCtrl.push(MenuPage);
  //     // this.navCtrl.setRoot(MenuPage);
  //     alert('Cadastro Realizado com sucesso');
  //   }
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroFirstPage');
  }
}
