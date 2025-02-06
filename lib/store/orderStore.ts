import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SenderPoint {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}

interface SenderAddress {
    street: string;
    house: string;
    apartment: string;
    comment?: string; // comment может быть undefined
}

interface Sender {
    phone: string;
    firstname: string;
    lastname: string;
}

interface ReceiverPoint {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}

interface ReceiverAddress {
    street: string;
    house: string;
    apartment: string;
    comment?: string; // comment может быть undefined
}

interface Receiver {
    phone: string;
    firstname: string;
    lastname: string;
}

interface Order {
    senderPoint: SenderPoint;
    senderAddress: SenderAddress;
    sender: Sender;
    receiverPoint: ReceiverPoint;
    receiverAddress: ReceiverAddress;
    receiver: Receiver;
    payer: string;
    status: number;
    cancellable: boolean;
    _id: string;
    created: string;
    updated: string;
}

interface OrderResponse {
    success: boolean;
    order: Order;
}

export interface OrderData {
    data: OrderResponse;
    status: number;
    statusText: string;
    headers: {
        "content-length": string;
        "content-type": string;
    };
    config: {
        transitional?: {
            silentJSONParsing: boolean;
            forcedJSONParsing: boolean;
            clarifyTimeoutError: boolean;
        };
        adapter?: string[];
        transformRequest?: Array<null>;
        transformResponse?: Array<null>;
        timeout?: number;
        xsrfCookieName?: string;
        xsrfHeaderName?: string;
        maxContentLength?: number;
        maxBodyLength?: number;
        env?: Record<string, unknown>;
        headers?: {
            Accept: string;
            "Content-Type": string;
            Authorization: string;
        };
        baseURL?: string;
        method?: string;
        url?: string;
        data: string;
    };
    request: Record<string, unknown>;
}

interface OrderState {
    data: OrderData | null;
    setData: (newData: OrderData) => void;
    clearData: () => void;
}

const useOrderStore = create<OrderState>()(
    persist<OrderState>(
        (set) => ({
            data: null,
            setData: (newData) => set({ data: newData }),
            clearData: () => set({ data: null }),
        }),
        {
            name: "order-store",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useOrderStore;
