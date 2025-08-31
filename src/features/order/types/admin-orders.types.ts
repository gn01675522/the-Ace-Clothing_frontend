import { AdminOrderDto } from "../DTOs/adminOrders.dtos";

export type OrderEditModalTypes = {
  isOpen: boolean;
  targetData: AdminOrderDto | null;
};
