import { IOrder } from "../DTOs/adminOrders.dtos";

export type OrderEditModalTypes = {
  isOpen: boolean;
  targetData: IOrder | null;
};
