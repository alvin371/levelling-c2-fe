// Categories Module Types

export interface ParrentCategory {
  id: number;
  name: string;
}
export interface Subcategory {
  id: number;
  name: string;
}

export interface CreateCategoryRequest {
  name: string;
  description: string;
  parent_category?: ParrentCategory;
  subcategories?: Subcategory[];
}

export interface CategoryResponse {
  id: number;
  name: string;
  description: string;
  parent_category?: ParrentCategory;
  subcategories?: Subcategory[];
}

export interface UpdateCategoryRequest extends CreateCategoryRequest {}

export interface ListCategoriesResponse extends Array<CategoryResponse> {}
