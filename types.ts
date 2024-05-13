export interface Billboard {
  billboard_id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  category_id: string;
  name: string;
  billboard: Billboard;
}

export interface Product {
  product_id: string;
  category: Category;
  name: string;
  price: string;
  isFeatured: boolean;
  size: Size;
  color: Color;
  images: Image[];
}

export interface Image {
  image_id: string;
  url: string;
}

export interface Size {
  size_id: string;
  name: string;
  value: string;
}

export interface Color {
  color_id: string;
  name: string;
  value: string;
}
