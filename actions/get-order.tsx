import { Order } from "@/types";

import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders/`;

interface Query {
  userId?: string | null;
  orderId?: string | null;
}

const getOrder = async (query: Query): Promise<Order> => {
  const url = qs.stringifyUrl({
    url: URL + query.orderId,
    query: {
      userId: query.userId,
    },
  }); 

  const res = await fetch(url);
  return res.json();
};

export default getOrder;
