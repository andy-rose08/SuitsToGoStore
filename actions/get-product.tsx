import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (product_id: string): Promise<Product> => {
  const res = await fetch(`${URL}/${product_id}`);

  return res.json();
};

export default getProduct;
