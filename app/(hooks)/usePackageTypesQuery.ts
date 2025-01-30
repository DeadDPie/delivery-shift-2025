import { fetchPackageTypes } from "@/lib/api/requests";
import { useQuery } from "@tanstack/react-query";

export const usePackageTypesQuery = (
    settings?: QuerySettings<typeof fetchPackageTypes>
) =>
    useQuery({
        queryKey: ["packageTypes"],
        queryFn: () => fetchPackageTypes({ config: settings?.config }),
        ...settings?.options,
    });
