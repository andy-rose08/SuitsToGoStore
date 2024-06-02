"use client";

import Image from "next/image";
import { X } from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { OrderItem } from "@/types";

interface CartItemProps {
  data: OrderItem;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.product.product_id);
  }

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          sizes="(max-width: 600px) 100vw, 
          (max-width: 900px) 75vw, 
          50vw"
          src={data.product.images[0].url}
          alt="Product Image"
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-[#252440] dark:text-white ">
              {data.product.name}
            </p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.product.color.name}</p>
            <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">
              {data.product.size.name}
            </p>
          </div>
          <div className="pt-3 flex text-sm text-center">
            <div className="ml-4 pl-4">
              Precio: <Currency value={data.product.price}/>
            </div>
            <div className="text-gray-500 ml-4 pl-4">
              Cantidad: {data.quantity}
            </div>
            <div className="ml-4 pl-4">
              Subtotal 
              <Currency value={data.quantity * Number(data.product.price)}/>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
