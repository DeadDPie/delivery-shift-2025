import { instance } from "../instance";

export interface DeliveryPoint {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}
export interface FetchDeliveryPointsResponse {
    success: boolean;
    points: DeliveryPoint[];
}

export const fetchDeliveryPoints = async ({ config }: RequestConfig) =>
    instance.get<FetchDeliveryPointsResponse>("/delivery/points", {
        ...config,
    });
