import { fetchDeliveryPoints } from "@/lib/api/requests";
import { useQuery } from "@tanstack/react-query";

export const useDeliveryPointsQuery = (
    settings?: QuerySettings<typeof fetchDeliveryPoints>
) =>
    useQuery({
        queryKey: ["deliveryPoints"],
        queryFn: () => fetchDeliveryPoints({ config: settings?.config }),
        ...settings?.options,
    });
