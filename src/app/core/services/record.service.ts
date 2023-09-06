import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICustomForm } from '../models/custom-form.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }

  getCustomForm(record: string): Observable<ICustomForm | null> {
    return this.http.get<ICustomForm[] | null>(`http://localhost:3000/custom_forms`)
      .pipe(
        map(response => response?.find(r => r.name === record) ?? null)
      )
  }
}