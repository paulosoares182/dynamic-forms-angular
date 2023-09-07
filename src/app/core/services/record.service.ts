import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICustomForm } from '../models/custom-form.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }

  getCustomForm(formName: string): Observable<ICustomForm | null> {
    return this.http.get<any>(`http://localhost:3000/custom_forms?name=${formName}`)
      .pipe(
        map(payload => payload?.at(0) as ICustomForm)
      );
  }
}