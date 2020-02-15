import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference} from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable, from } from 'rxjs'
export interface MapData{
  id?: string,
  lat:string,
  lang:string 
}
@Injectable({
  providedIn: 'root'
})
export class GpsService {

  private mapdatas: Observable<MapData[]>;
  private mapdataCollection: AngularFirestoreCollection<MapData>;


  constructor(private afs: AngularFirestore) { 
    this.mapdataCollection = this.afs.collection<MapData>('coords');
    this.mapdatas = this.mapdataCollection.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data};
        })
      })
    )
  }

  getMapDatas(): Observable<MapData[]>{
    return this.mapdatas;
  }
}
