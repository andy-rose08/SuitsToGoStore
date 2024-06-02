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
  quantity: number;
  isFeatured: boolean;
  size: Size;
  color: Color;
  images: Image[];
}

export interface OrderState{
  order_state_id: string;
  name: string;
}

export interface OrderItem{ //many to many, intermediate table
  order_item_id: string;
  order_id: string;
  product: Product;
  quantity: number;
}

export interface OrderItemCart{ // Table does not exist in prisma, just to managed data in cart
  product: Product;
  quantity: number;
}

export interface Order {
  order_id: string;
  userId: string;
  store_id: string;
  orderState: OrderState;
  orderItems: OrderItem[];
  isPaid: boolean;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
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
