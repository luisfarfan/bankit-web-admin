import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DynamicListPaginate, DynamicQueryParams } from "./interfaces/dynamic.interface";
import { objectToQuerystring } from "./utils/dynamic.utils";
import { BASEURL } from "../../shared/utils";

export class DynamicService<T> {
    protected endpoint;

    constructor(private http: HttpClient, endpoint?) {
        this.endpoint = endpoint;
    }

    setEndpoint(endpoint: string): void {
        this.endpoint = BASEURL + endpoint;
    }

    request<T>(): Observable<T> {
        return this.http.get<T>(`${this.endpoint}`);
    }

    get<T>(id: number): Observable<T> {
        return this.http.get<T>(`${this.endpoint}${id}/`);
    }

    list<T>(queryParams?: DynamicQueryParams, page?: number): Observable<any> {
        const url = queryParams ? `${this.endpoint}${objectToQuerystring(queryParams)}` : this.endpoint;
        return this.http.get<DynamicListPaginate<T>>(url, {
            params: {
                page: `${page}`
            }
        });
    }

    add<T, R>(body: T): Observable<R> {
        return this.http.post<R>(this.endpoint, body);
    }

    put<T, R>(id: number, body: T): Observable<R | T> {
        let file;
        return this.http.patch<R | T>(`${this.endpoint}${id}/`, body);
    }

    // putFiles(id: number, file: any): Observable<any> {
    //     const formData = new FormData();
    //     formData.append('logo', file);
    //     return this.http.patch<any>(`${this.host}${id}/`, formData).pipe(
    //         tap(console.log)
    //     );
    // }

    delete<T>(id: number): Observable<any> {
        return this.http.delete<T>(`${this.endpoint}${id}/`);
    }
}
