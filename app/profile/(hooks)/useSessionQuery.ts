import { FetchSessionParams, fetchSession } from "@/lib/api/requests";
import { useQuery } from "@tanstack/react-query";

export const useSessionQuery = (
    params: FetchSessionParams,
    settings?: QuerySettings<typeof fetchSession>
) =>
    useQuery({
        queryKey: ["session", params.token],
        queryFn: () => fetchSession({ params, config: settings?.config }),
        enabled: !!params.token,
        ...settings?.options,
    });
