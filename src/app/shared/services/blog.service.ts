import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Blog } from "../interfaces/blog.interface";
import { BlogEndpoint } from "../endpoints/blog.endpoint";
import { objectToFormData } from "../utils";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<Blog[]> {
    return this.http.get<Blog[]>(BlogEndpoint.blog)
  }

  get(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${BlogEndpoint.blog}${id}/`)
  }

  add(blog: Partial<Blog>, formData = false): Observable<Blog> {
    return this.http.post<Blog>(BlogEndpoint.blog, formData ? objectToFormData(blog) : blog);
  }

  patch(id: number, blog: Partial<Blog>, formData = false): Observable<Blog> {
    return this.http.patch<Blog>(`${BlogEndpoint.blog}${id}/`, formData ? objectToFormData(blog) : blog);
  }
}
