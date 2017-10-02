import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = MenuPage;
  items: Observable<any[]>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private providerData: DatabaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // this.providerData.getAllRegisters()
      // .subscribe( (loca) => {
      //   console.log(loca);
      // }, error => {
      //   console.log(error);
      // } );
      // db.list('usuario').subscribe( (x) => {
      //   console.log(x);
      // });
    });
  }
}

