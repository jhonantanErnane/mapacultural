import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class LoadingProvider {
  loading: Loading;

  constructor(public loadingCtrl: LoadingController) { }

    presentLoadingDefault(texto: string) {
      this.loading = this.loadingCtrl.create({
        content: `${texto}`
      });
// 'Please wait...'
      this.loading.present();
      // setTimeout(() => {
      //   this.loading.dismiss();
      // }, 5000);
    }

    hideLoadingDefault() {
      this.loading.dismiss();
    }
    presentLoadingCustom() {
      const loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `
          <div class="custom-spinner-container">
            <div class="custom-spinner-box"></div>
          </div>`,
        duration: 5000
      });

      loading.onDidDismiss(() => {
        console.log('Dismissed loading');
      });

      loading.present();
    }

    // presentLoadingText() {
    //   const loading = this.loadingCtrl.create({
    //     spinner: 'hide',
    //     content: 'Loading Please Wait...'
    //   });

    //   loading.present();

    //   setTimeout(() => {
    //     this.nav.push(Page2);
    //   }, 1000);

    //   setTimeout(() => {
    //     loading.dismiss();
    //   }, 5000);
    // }

  }
