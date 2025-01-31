import { DeliveryOption, DeliveryPoint } from ".";
import { instance } from "../instance";

export interface Address {
    street: string;
    house: string;
    apartment: string;
    comment?: string;
}

export interface Person {
    firstname: string;
    lastname: string;
    middlename?: string;
    phone: string;
}

export interface PostDeliveryOrderParams {
    senderPoint?: DeliveryPoint;
    senderAddress?: Address;
    sender?: Person;
    receiverPoint?: DeliveryPoint;
    receiverAddress?: Address;
    receiver?: Person;
    payer?: "RECEIVER" | "SENDER";
    option?: DeliveryOption;
}

export interface Order {
    senderPoint: DeliveryPoint;
    senderAddress: Address;
    sender: Person;
    receiverPoint: DeliveryPoint;
    receiverAddress: Address;
    receiver: Person;
    payer: "RECEIVER" | "SENDER";
    status: number;
    cancellable: boolean;
    _id: string;
    created: string;
    updated: string;
}

export interface DeliveryOrderResponse {
    success: boolean;
    order: Order;
}

export type PostDeliveryOrderRequestConfig =
    RequestConfig<PostDeliveryOrderParams>;

export const postDeliveryOrder = async ({
    params,
    config,
}: PostDeliveryOrderRequestConfig) =>
    instance.post<DeliveryOrderResponse>(`/delivery/order`, params, config);
