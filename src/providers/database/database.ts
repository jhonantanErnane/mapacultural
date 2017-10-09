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
  postNewPlace(nomeCat: string, nome: string, lat: number, long: number, desc: string): firebase.database.ThenableReference {
    const newPlace = {
          'nome': nome,
          'lat': lat,
          'long': long,
          'desc': desc,
          'foto': 'null'
    };
      return this.db.list(`locais/${nomeCat}`).push(newPlace);
  }
  postNewFoto(nomeCategoria: string, nome: string, chaveRegistro: string, localPicture: string ): firebase.storage.UploadTask {
    return firebase.storage().ref(`/${nomeCategoria}/${chaveRegistro}/${nome}/picture.png`)
    .putString(localPicture, 'base64', {contentType: 'image/png'});
  }

  updateRegisterFoto (nomeCategoria: string, chaveRegistro: string, nomeLocal: string, URLImage: string): firebase.Promise<void> {
    const asd = firebase.database().ref().child(`locais/${nomeCategoria}/${chaveRegistro}/`);
    return this.db.list(`locais/${nomeCategoria}/${chaveRegistro}/`).update(asd, {'foto': URLImage});
  }
  getOneRegister(nome: string, nomeCat: string): Observable<any[]> {
    return this.db.list(`/locais/${nomeCat}/${nome}`);
    // return this.db.list('/locais');
  }

  getAllLocations(): FirebaseListObservable<any[]> {
    return this.db.list('locais');
  }

}
