import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/nextjs"
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import deleteOrder from "@/actions/delete-order";

const Summary = () => {
  const { user } = useUser(); 
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const searchParams = useSearchParams();

  const totalPrice = items.reduce((total, item) => {
    return total + (Number(item.product.price) * item.quantity);
  }, 0);

  const onCheckout = async () => {
    try{
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          items: items.map((item) => {
            return {product_id: item.product.product_id, quantity: item.quantity}
          }),
          userId: user?.id
        }
      );
      window.location = response.data.url;
    } catch(error: any){
      console.log(error)
      if(error?.response.status === 404){
        for(let item of error?.response.data.non_stock_items){
          toast.error(`Item ${item.product.name} x ${item.quantity} no tiene suficiente stock`);
        }
      }
    }
  };

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Pago completado, Pedido creado!");
      removeAll();
    }
    if (searchParams.get("canceled")) {
      toast.error("Pedido no pagado, el pedido no se ha realizado!");
      deleteOrder({
        userId: user?.id,
        orderId: searchParams.get("orderId")
      });
    }
  }, [user, searchParams, removeAll]);

  return (
    <div
      className="mt-16 rounded-lg bg-gray-50 dark:bg-[#1f3950] px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8
    
    "
    >
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
        Order Summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900 dark:text-white">
            Order Total
          </div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        disabled={items.length === 0}
        onClick={onCheckout}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
