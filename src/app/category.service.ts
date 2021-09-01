import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db : AngularFireDatabase) { }
  getAll(){
    return this.db.list('/categories',s => s.orderByChild('/categories/name')).snapshotChanges();
  }
}
