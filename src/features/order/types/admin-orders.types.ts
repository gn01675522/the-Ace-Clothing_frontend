import { AdminOrderDto } from "../DTOs/adminOrders.dtos";

export type OrderEditModalTypes = {
  isOpen: boolean;
  targetData: AdminOrderDto | null;
};

export enum CHECKOUT_INPUT_CLASSES {
  email = "email",
  name = "name",
  tel = "tel",
  address = "address",
}

export type CheckoutFormTypes = {
  [CHECKOUT_INPUT_CLASSES.email]: string;
  [CHECKOUT_INPUT_CLASSES.name]: string;
  [CHECKOUT_INPUT_CLASSES.tel]: string;
  [CHECKOUT_INPUT_CLASSES.address]: string;
};
