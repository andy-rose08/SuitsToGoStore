"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import { useRouter } from "next/navigation";

export type OrderColumn = {
  order_id: string;
  address: string;
  orderItems: string;
  order_state_id: string;
  totalPrice: string;
  createdAt: string;
};

const ActionButton: React.FC<{ order_id: string }> = ({ order_id }) => {
  const router = useRouter();

  const handleClick = () => {
    router.refresh();
    router.push(`/orders/${order_id}`);
  };

  return <IconButton onClick={handleClick} icon={<Eye size={15} />} />;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "order_id",
    header: "ID",
  },
  {
    accessorKey: "orderItems",
    header: "Productos",
  },
  {
    accessorKey: "address",
    header: "Dirección",
  },
  {
    accessorKey: "totalPrice",
    header: "Precio Total",
  },
  {
    accessorKey: "order_state_id",
    header: "Estado",
  },
  {
    accessorKey: "createdAt",
    header: "Fecha del pedido",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionButton order_id={row.original.order_id} />
  },
];
