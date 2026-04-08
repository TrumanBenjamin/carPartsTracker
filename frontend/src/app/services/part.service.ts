import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Part } from '../models/part';

@Injectable({
  providedIn: 'root',
})
export class PartService {
  private apiUrl = 'http://localhost:3000/parts';

  constructor(private http: HttpClient) {}

  getParts(): Observable<Part[]> {
    return this.http.get<Part[]>(this.apiUrl);
  }

  getPartById(id: string): Observable<Part> {
    return this.http.get<Part>(`${this.apiUrl}/${id}`);
  }

  createPart(part: Part): Observable<Part> {
    return this.http.post<Part>(this.apiUrl, part);
  }

  updatePart(id: string, part: Part): Observable<Part> {
    return this.http.put<Part>(`${this.apiUrl}/${id}`, part);
  }

  deletePart(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
