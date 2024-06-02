import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { OrderItemCart } from "@/types";
import toast from "react-hot-toast";

interface CartStore {
  items: OrderItemCart[];
  addItem: (data: OrderItemCart) => void;
  getItemQuantity: (id: string) => number;
  removeItem: (id: string) => void;
  decreaseItem: (data: OrderItemCart) => void;
  increaseItem: (data: OrderItemCart) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: OrderItemCart) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product.product_id === data.product.product_id
        );
        if (existingItem) {
          existingItem.quantity = existingItem.quantity + data.quantity;
          toast.success("Item ya existe en el carrito de compras, La cantidad ha incrementado!");
        }else{
          set({ items: [...currentItems, data] });
          toast.success("Item agregado al carrito de compras!");
        }
      },
      getItemQuantity: (id: string) => {
        let item = get().items.find((item) => item.product.product_id === id)
        if(item){
          return item.quantity
        }
        return 0;
      },
      removeItem: (id: string) => {
        set({
          items: [...get().items.filter((item) => item.product.product_id !== id)],
        });
        toast.success("Item removed from cart!");
      },
      decreaseItem: (data: OrderItemCart) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product.product_id === data.product.product_id
        );
        if (existingItem) {
          existingItem.quantity = existingItem.quantity - data.quantity;
          if(existingItem.quantity == 0){
            set({
              items: [...get().items.filter((item) => item.product.product_id !== data.product.product_id)],
            });
            toast.success("Item eliminado del carrito de compras!");
          } else{
            toast.success("Cantidad disminuida!");
          }
        }else{
          toast.error("Este item no se encuentra en el carrito de compras!");
        }
      },
      increaseItem: (data: OrderItemCart) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product.product_id === data.product.product_id
        );
        if (existingItem) {
          if(existingItem.quantity + data.quantity <= data.product.quantity) {
            existingItem.quantity = existingItem.quantity + data.quantity;
            toast.success("Cantidad incrementada!");
          } else{
            toast.error("No hay suficiente inventario!");
          }
        }else{
          set({ items: [...currentItems, data] });
          toast.success("Item agregado al carrito de compras!");
        }
      },
      removeAll: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
