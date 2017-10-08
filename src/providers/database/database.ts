import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseProvider {

  constructor(private db: AngularFireDatabase) {
    // console.log('Hello DatabaseProvider Provider');
  }

  getAllRegisters(): Observable<any[]> {
    return this.db.list('usuario');
    // .subscribe( (x) => {
    //   return console.log(x);
    // }, error => {
    //   return console.log(error);
    // });
  }
  getAllCategories(): Observable<any[]> {
    return this.db.list('categorias');
  }
  // Firebase.Promise<void>
  postNewPlace(catID: number, nome: string, lat: number, long: number, desc: string): firebase.Promise<void> {
    const newPlace = {
          'nome': nome,
          'lat': lat,
          'long': long,
          'desc': desc
    };
      return this.db.list(`locais/${catID}`).push(newPlace); // (catID.toString(), newPlace);
  }
  postNewFoto(catID: number, nome: string, localPicture: string ) {
    return firebase.storage().ref(`/${catID}/${nome}/picture.png`)
    .putString(localPicture, 'base64', {contentType: 'image/png'});
  }

  getOneRegister(nome: string, catID: number): Observable<any[]> {
    return this.db.list(`/locais/${catID}/${nome}`);
    // return this.db.list('/locais');
  }

  getAllLocations(): FirebaseListObservable<any[]> {
    return this.db.list('locais');
  }

}
