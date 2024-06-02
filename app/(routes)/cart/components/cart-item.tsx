"use client";

import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/use-cart";
import { OrderItemCart } from "@/types";

interface InterfaceCartItem {
  data: OrderItemCart;
}

const CartItem: React.FC<InterfaceCartItem> = ({ data }) => {
  const router = useRouter();
  const cart = useCart();

  const handleClick = () => {
    router.push(`/product/${data?.product.product_id}`);
  };

  const decreaseItem = () => {
    cart.decreaseItem({product: data.product, quantity: 1});
    router.refresh();
  };
  
  const increaseItem = () => {
    cart.increaseItem({product: data.product, quantity: 1});
    router.refresh();
  };
  
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
          <div className="flex justify-start">
            <p className="text-lg font-semibold text-[#252440] dark:text-white ">
              {data.product.name}
            </p>
          </div>
          <div className="flex justify-start">
            <p className="text-gray-500">{data.product.color.name}</p>
            <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">{data.product.size.name}</p>
          </div>
          <div className="flex justify-between text-center">
            <div className="m-3"> Precio: <Currency value={data.product.price}/></div>
            <div className="m-3"> <IconButton onClick={decreaseItem} icon={<Minus size={15} />} /></div>
            <div className="m-3"> Cantidad: {data.quantity}</div>
            <div className="m-3"> <IconButton onClick={increaseItem} icon={<Plus size={15} />} /></div>
            <div className="m-3"> Subtotal <Currency value={data.quantity * Number(data.product.price)}/></div>
          </div>
        </div>
        <div className="flex justify-around">
          <Button
            onClick={handleClick}
            className="mt-6">
            Ir al producto
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
