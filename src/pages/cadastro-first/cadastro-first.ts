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
import { AlertController } from 'ionic-angular';

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
    , private alertCtrl: AlertController
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
      quality: 60,
      destinationType: this.cameraPlugin.DestinationType.DATA_URL,
      sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
      // allowEdit: true,
      encodingType: this.cameraPlugin.EncodingType.JPEG,
      targetWidth: 220,
      targetHeight: 500,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.localPicture = imageData;
      this.fotoOk = true;
    }, error => {
      console.log('ERROR -> ' + JSON.stringify(error));
    });
  }

  cadastrar() {
    if ((this.categoriaSelecionada) && (this.nome)
    && (this.latitude) && (this.longitude) && (this.desc)) {
      this.GravarDados();
    } else {
      this.showAlert('Por favor preencha todos os campos!');
    }
  }

  GravarDados() {
    this.contLoading++;
    this.semaforoLoading();
    // console.log(this.categoriaSelecionada);
    this.providerdb.postNewPlace(this.categoriaSelecionada.$value, this.nome, this.latitude, this.longitude, this.desc)
    .then((success) => {
      console.log(success);
      if (this.localPicture !== null) {
        this.GravarFoto(success.path.pieces_[1], success.path.pieces_[2]);
      }
      this.contLoading--;
      this.semaforoLoading();
      console.log('Cadastro Realizado com sucesso');
    }, (error) => {
      this.contLoading--;
      this.semaforoLoading();
      console.log('Erro ao cadastrar');
    });
  }

  GravarFoto ( nomeCategoria: string, chaveRegistro: string) {
    this.contLoading++;
    this.semaforoLoading();
    this.providerdb.postNewFoto(nomeCategoria, this.nome, chaveRegistro, this.localPicture)
    .then((success) => {
      // console.log('-----------------------downloadURL---------');
      // console.log(success.downloadURL);

      this.contLoading++;
      this.semaforoLoading();
      this.providerdb.updateRegisterFoto(nomeCategoria, chaveRegistro, this.nome, success.downloadURL)
        .then((updateSuccess) => {
          console.log('registro alterado com sucesso');
          this.contLoading--;
          this.semaforoLoading();
        }, (updateError) => {
          this.contLoading--;
          this.semaforoLoading();
          console.log(updateError.message);
          console.log('registro não foi alterado');
        });

      this.contLoading--;
      this.semaforoLoading();
      console.log('Cadastro Realizado com sucesso');
      // alert('cadastrou');
    }, (error) => {
      this.contLoading--;
      this.semaforoLoading();
      console.log('Erro ao cadastrar');
      // alert(error.message.toString());
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
      this.showAlert('Registro cadastrado com sucesso!');
      this.navCtrl.setRoot(MenuPage);
    }
  }

  showAlert(mensagem: string ) {
    const alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: `${mensagem}`,
      buttons: ['OK']
    });
    alert.present();
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
