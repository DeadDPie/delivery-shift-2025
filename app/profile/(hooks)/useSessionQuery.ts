import { fetchSession } from "@/lib/requests/sessionRequests";
import { useQuery } from "@tanstack/react-query";

export const useSessionQuery = (token: string) => {
    return useQuery({
        queryKey: ["session", token],
        queryFn: () => fetchSession(token),
        enabled: !!token,
    });
};
