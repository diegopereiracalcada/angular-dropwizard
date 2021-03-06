import { CategoriesDataStorageService } from '../../shared/categories-data-storage.service';
import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../category.model';
import { CategoriesService } from '../categories.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  
  category: Category;
  id: number;
  
  constructor(private categoriesService: CategoriesService,
              private categoriesDataStorageService: CategoriesDataStorageService,
              private route: ActivatedRoute,
              private router: Router) { }
  
  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          console.log("params", params);
          this.category = this.categoriesService.getCategory(this.id);
        }
      );
  }

  onEditCategory(){
    this.router.navigate(['edit'], { relativeTo: this.route});
  }

  onDeleteCategory(){
    this.categoriesDataStorageService.deleteCategory(this.id)
      .subscribe(
        (res: any) => {
          if(res != undefined && res.message != undefined){
            alert(res.message);
            this.router.navigate(['/categorias']);
            this.categoriesDataStorageService.fetchCategories();
          } else {
            alert("Erro ao tentar excluir a categoria.");
          }
        }
      );
  }
}
