import { useAxiosDelete, useAxiosGet, useAxiosPost, useAxiosPut } from './RootService';

export interface ShoppingListItem {
  id: number;
  name: string;
  description: string;
  quantity: number;
  purchased: boolean;
}
type AddUpdateShoppingListItem = Omit<ShoppingListItem, 'id'>;

export const useGetShoppingList = () => useAxiosGet<ShoppingListItem[]>(`/api/shopping-list`);
export const useDeleteShoppingListItem = (itemId: number) => useAxiosDelete<{}>(`/api/shopping-list/${itemId}`);
export const usePostNewShoppingListItem = () => useAxiosPost<AddUpdateShoppingListItem, ShoppingListItem>(`/api/shopping-list`);
export const usePutUpdateShoppingListItem = (itemId: number) => useAxiosPut<AddUpdateShoppingListItem, ShoppingListItem>(`/api/shopping-list/${itemId}`);
