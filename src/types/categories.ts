
// Categories Module Types

export interface Subcategory {
    id: number;
    name: string;
}

export interface CreateCategoryRequest {
    name: string;
    description: string;
    parentCategoryId: number | null;
    subcategories: Subcategory[];
}

export interface CategoryResponse {
    id: number;
    name: string;
    description: string;
    parentCategoryId: number | null;
    subcategories: Subcategory[];
}

export interface UpdateCategoryRequest extends CreateCategoryRequest {}

export interface ListCategoriesResponse extends Array<CategoryResponse> {}
