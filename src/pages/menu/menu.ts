import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroFirstPage } from '../cadastro-first/cadastro-first';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  cadastro() {
    this.navCtrl.push(CadastroFirstPage);
  }
  mapa() {
    // this.navCtrl.push();
  }
}
