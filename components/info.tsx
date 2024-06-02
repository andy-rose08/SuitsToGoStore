"use client";
import React, { useState } from "react";
import { Product } from "@/types";
import { Plus, Minus } from "lucide-react";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import IconButton from "@/components/ui/icon-button";
import { BriefcaseBusiness } from "lucide-react";
import useCart from "@/hooks/use-cart";

interface InfoProps {
  product: Product;
}

const Info: React.FC<InfoProps> = ({ product }) => {
  const cart = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(cart.getItemQuantity(product.product_id));

  const onAddToCart = () => {
    cart.addItem({ product: product, quantity: 1 });
    setQuantity(cart.getItemQuantity(product.product_id));
  };

  const decreaseItem = () => {
    cart.decreaseItem({product: product, quantity: 1});
    setQuantity(cart.getItemQuantity(product.product_id));
  };
  
  const increaseItem = () => {    
    cart.increaseItem({product: product, quantity: 1});
    setQuantity(cart.getItemQuantity(product.product_id));
  };
  

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold dark:text-white text-black">
        {product.name}
      </h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl dark:text-white text-black">
          <Currency value={product.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold dark:text-white text-black">Size:</h3>
          <div className="text-black dark:text-white">{product.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold dark:text-white text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: product.color?.value }}
          />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        {(quantity !== 0) ? (
          <>
            <IconButton onClick={decreaseItem} icon={<Minus size={15} />} />
            <span>Cantidad: {quantity}</span>
            <IconButton onClick={increaseItem} icon={<Plus size={15} />} />
          </>
        ) : (
          <Button onClick={onAddToCart} className="flex items-center gap-x-2">
            Add To Cart
            <BriefcaseBusiness />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Info;
