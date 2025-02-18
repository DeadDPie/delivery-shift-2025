import { instance } from "../instance"

export interface PostDeliveryCalcParams {
    package: {
        length: number;
        width: number;
        weight: number;
        height: number;
    };
    senderPoint: {
        latitude: number;
        longitude: number;
    };
    receiverPoint: {
        latitude: number;
        longitude: number;
    };
}

export interface DeliveryOption {
    id: string;
    days: number;
    price: number;
    name: string;
    type: "DEFAULT" | "EXPRESS";
}

export interface DeliveryCalcResponse {
    success: boolean;
    options: DeliveryOption[];
}

export type PostDeliveryCalcRequestConfig = RequestConfig< PostDeliveryCalcParams>

export const postDeliveryCalc = async ({ params, config }: PostDeliveryCalcRequestConfig) =>
  instance.post(`/delivery/calc`, params, config)

