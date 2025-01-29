import { SessionResponse, fetchSession } from "@/lib/api/requests";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useSessionQuery = (
    token: string,
    options?: UseQueryOptions<SessionResponse, Error>
) => {
    return useQuery({
        queryKey: ["session", token],
        queryFn: () => fetchSession(token),
        enabled: !!token,
        ...options,
    });
};
