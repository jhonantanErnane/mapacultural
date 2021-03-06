import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { CadastroFirstPage } from '../pages/cadastro-first/cadastro-first';
import { AgmCoreModule } from '@agm/core';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';


import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/enviroment';
import { AngularFireDatabase } from 'angularfire2/database';
import { DatabaseProvider } from '../providers/database/database';
import { Camera } from '@ionic-native/camera';
import { LoadingProvider } from '../providers/loading/loading';
import { MapaPage } from '../pages/mapa/mapa';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    CadastroFirstPage,
    AutocompletePage,
    MapaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapaPage,
    MenuPage,
    CadastroFirstPage,
    AutocompletePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Geolocation,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    LoadingProvider
  ]
})
export class AppModule {}
