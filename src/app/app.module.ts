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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    CadastroFirstPage,
    AutocompletePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // AgmCoreModule
    // .forRoot({
    //   apiKey: 'AIzaSyDaPkuFZA4USo1-evIwjof1qYgeSsARakw'
    //   // AIzaSyDaPkuFZA4USo1-evIwjof1qYgeSsARakw
    // }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    CadastroFirstPage,
    AutocompletePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
