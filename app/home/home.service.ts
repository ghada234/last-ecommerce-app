import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../shared/Models/Category';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl = environment.apiUrl;
  categories:Category[];

  constructor(private http:HttpClient) { }


  getParentCategories(){
    return this.http.get<Category[]>(`${this.baseUrl}product/getcategories`);

  }

}
