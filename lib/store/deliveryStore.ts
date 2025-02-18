import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface DeliveryData {
    params?: any;
    response?: any;
}

interface DeliveryState {
    data: DeliveryData;
    setData: (newData: DeliveryData) => void;
    clearData: () => void;
}

const useDeliveryStore = create<DeliveryState>()(
    persist<DeliveryState>(
        (set) => ({
            data: {},
            setData: (newData) => set({ data: newData }),
            clearData: () => set({ data: {} }),
        }),
        {
            name: "delivery-store",
            storage: createJSONStorage<DeliveryState>(() => sessionStorage),
        }
    )
);

export default useDeliveryStore;
