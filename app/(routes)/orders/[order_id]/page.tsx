import Container from "@/components/ui/container";
import getOrder from "@/actions/get-order";
import { auth } from "@clerk/nextjs";
import { DataTable } from "@/components/ui/data-table";
import { OrderItemColumn, columns } from "./components/colums";
import OrderTracker from './components/order-tracker';
import getOrderStates from "@/actions/get-order-states";
import { format, addDays } from "date-fns";
import React from "react";

interface OrderPageProps {
  params: {
    order_id: string;
    store_id: string;
  };
}

const OrderPage: React.FC<OrderPageProps> = async ({
  params
}) => {
  const { userId } = auth();
  const order = await getOrder({orderId: params.order_id, userId: userId});
  const states = await getOrderStates();

  const formattedProducts: OrderItemColumn[] = order.orderItems.map((item) => ({
    product: `Nombre: ${item.product.name} Color: ${item.product.color.name} Talla: ${item.product.size.name}`,
    unit_price: item.product.price,
    quantity: item.quantity,
    subtotal: item.quantity * Number(item.product.price)
  }));

  const formattedStates: string[] = states.map((state) => {
    if(Number(state.order_state_id) === 1) {
      return state.name + ": " + format(order.createdAt, "MMMM dd, yyyy")
    } else if (Number(state.order_state_id) === states.length) {
      return state.name + ": " + format(addDays(new Date(order.createdAt), 8), "MMMM dd, yyyy") + " - " + format(addDays(new Date(order.createdAt), 10), "MMMM dd, yyyy")
    } else {
      return state.name
    }
  });

  const totalPrice = order.orderItems.reduce((total, item) => {
    return total + (Number(item.product.price) * item.quantity);
  }, 0);

  return (
    <div className="bg-white dark:bg-[#0D1A25]">
      <Container>
        <div className="px-4 pt-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl my-3 font-bold text-black dark:text-white">
            Pedido 
          </h1>
          <h3 className="text-black dark:text-white">
            ID: {order.order_id}
          </h3>
          <h4 className="text-black dark:text-white">
            Fecha de la orden: {format(order.createdAt, "MMMM dd, yyyy")}
          </h4>
          <h4 className="text-black dark:text-white">
            Direccion: {order.address}
          </h4>
          <h4 className="text-black dark:text-white">
            Telefono: {order.phone}
          </h4>
          <h4 className="font-bold text-black dark:text-white">
            Total: {totalPrice}
          </h4>
          <div>
          <h2 className="text-xl my-3 font-bold text-black dark:text-white">
            Estado 
          </h2>
          <OrderTracker states={formattedStates} currentState={Number(order.orderState.order_state_id)}/>
          </div>
          <div className="mt-4 lg:grid lg:grid-cols-12 lg:items-start gap-x-12 mb-8">
            <h2 className="text-xl my-3 font-bold text-black dark:text-white">
              Productos 
            </h2>
            <div className="lg:col-span-12">
              {order.orderItems.length === 0 && (
                <p className="text-neutral-500">No products in Order</p>
              )}
              {order.orderItems.length > 0 && (
                <DataTable searchKey={"product"} columns={columns} data={formattedProducts} />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderPage;
