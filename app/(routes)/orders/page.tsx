import Container from "@/components/ui/container";
import getOrders from "@/actions/get-orders";
import { auth } from "@clerk/nextjs";
import { DataTable } from "@/components/ui/data-table";
import { OrderColumn, columns } from "./components/colums";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";

const OrdersPage = async () => {
  const { userId } = auth();
  const orders = await getOrders({userId: userId});

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    order_id: order.order_id,
    totalPrice: formatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product.price) * Number(item.quantity);
      }, 0)
    ),
    order_state_id: order.orderState.name,
    createdAt: format(order.createdAt, "MMMM dd, yyyy"),
    address: order.address,
    orderItems: order.orderItems
      .map((orderItem) => orderItem.product.name + " x " + orderItem.quantity)
      .join(", "),
  }));

  return (
    <div className="bg-white dark:bg-[#0D1A25]">
      <Container>
        <div className="px-4 pt-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            My Orders
          </h1>
          <div className="mt-4 lg:grid lg:grid-cols-12 lg:items-start gap-x-12 my-8">
            <div className="lg:col-span-12">
              <DataTable searchKey="orderItems" columns={columns} data={formattedOrders} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrdersPage;
