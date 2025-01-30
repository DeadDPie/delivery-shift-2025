import { create } from "zustand";

interface DeliveryData {
    params?: any;
    response?: any;
}

const useDeliveryStore = create<{
    data: DeliveryData;
    setData: (newData: DeliveryData) => void;
    clearData: () => void;
}>((set) => ({
    data: {},
    setData: (newData) => set({ data: newData }),
    clearData: () => set({ data: {} }),
}));

export default useDeliveryStore;
