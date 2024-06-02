import { OrderState } from "@/types";
const URL = `${process.env.NEXT_PUBLIC_API_URL}/orderstates`;

const getOrderStates = async (): Promise<OrderState[]> => {
  const res = await fetch(URL);
  return res.json();
};

export default getOrderStates;
