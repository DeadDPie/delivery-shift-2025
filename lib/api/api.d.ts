interface MutationSettings<Params = void, Func = unknown> {
    config?: ApiRequestConfig;
    options?: import("@tanstack/react-query").UseMutationOptions<
        Awaited<ReturnType<Func>>,
        any,
        Params,
        any
    >;
}

type ApiRequestConfig = import("axios").AxiosRequestConfig;

type RequestConfig<Params = undefined> = Params extends undefined
    ? {
          config?: ApiRequestConfig;
      }
    : {
          params: Params;
          config?: ApiRequestConfig;
      };
