import { Category } from '../categories/category.model';
import { CategoriesService } from '../categories/categories.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CategoriesDataStorageService {
  constructor(private http: HttpClient,
    private categoriesService: CategoriesService) { }

  fetchCategories() {
    this.http
      .get<Category[]>(
        'http://localhost:4200/rest/categories'
      )
      .subscribe(categories => {
        this.categoriesService.setCategories(categories)
      });
  }

  getCategories(): Observable<any> {
    return this.http
      .get<Category[]>(
        'http://localhost:4200/rest/categories'
      );
  }

  createCategory(category: Category): Observable<any> {
    console.log('DataStorageService - Trying to create a category... ', category);
    return this.http
      .put(`http://localhost:4200/rest/categories/new?title=${category.title}&description=${category.description}`, {});
  }

  updateCategory(category: Category): Observable<any> {
    console.log('DataStorageService - Trying to create a category... ', category);
    return this.http
      .put(`http://localhost:4200/rest/categories/${category.id}/edit?title=${category.title}&description=${category.description}`, {});
  }

  deleteCategory(id: number) {
    console.log('DataStorageService - Trying to delete a category... ', id);
    return this.http
      .delete(`http://localhost:4200/rest/categories/${id}`, {});
  }

}