import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICustomForm } from '../models/custom-form.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  http = inject(HttpClient);
  
  url: string = "http://localhost:3000/custom_forms";

  createCustomForm(form: ICustomForm): Observable<ICustomForm> {
    return this.http.post<ICustomForm>(this.url, form);
  }

  updateCustomForm(form: ICustomForm): Observable<ICustomForm> {
    return this.http.put<ICustomForm>(`${this.url}/${form.id}`, form);
  }

  getCustomFormById(id: number): Observable<ICustomForm | null> {
    return this.http.get<ICustomForm | null>(`${this.url}/${id}`)
  }

  getCustomForm(formName: string): Observable<ICustomForm | null> {
    return this.http.get<any>(`${this.url}?name=${formName}`)
      .pipe(
        map(response => response?.at(0) as ICustomForm)
      );
  }
}