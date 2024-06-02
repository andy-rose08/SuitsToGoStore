import { Order } from "@/types";
import axios from "axios";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders/`;

interface Query {
  userId?: string | null;
  orderId?: string | null;
}

const deleteOrder = async (query: Query) => {
  const url = qs.stringifyUrl({
    url: URL + query.orderId,
    query: {
      userId: query.userId,
    },
  });
  try{
    await axios.delete(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }catch(err) {
    console.log(err);
  }
};

export default deleteOrder;
