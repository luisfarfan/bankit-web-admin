import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export class AbstractHttpService<T> {
  endpoint;

  constructor(private http: HttpClient) {
  }

  get<T>(id): Observable<T> {
    return this.http.get<T>(`${this.endpoint}${id}/`);
  }

  list<T>(): Observable<T[]> {
    return this.http.get<T[]>(this.endpoint);
  }

  update<T>(id: number, data: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${this.endpoint}${id}/`, data);
  }

  add<T>(data: T): Observable<T> {
    return this.http.post<T>(this.endpoint, data);
  }

}
