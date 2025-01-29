import { fetchSession } from "@/lib/api/requests";
import { useQuery } from "@tanstack/react-query";

export const useSessionQuery = (
    settings?: QuerySettings<typeof fetchSession>
) =>
    useQuery({
        queryKey: ["session"],
        queryFn: () => fetchSession({ config: settings?.config }),
        ...settings?.options,
    });
