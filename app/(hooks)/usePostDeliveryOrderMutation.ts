import { useMutation } from '@tanstack/react-query'

import { PostDeliveryOrderRequestConfig, postDeliveryOrder } from '@/lib/api/requests'


export const usePostDeliveryOrderMutation = (
  settings?: MutationSettings<PostDeliveryOrderRequestConfig, typeof postDeliveryOrder>
) =>
  useMutation({
    mutationKey: ['postDeliveryOrder'],
    mutationFn: ({ params, config }) =>
    postDeliveryOrder({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  })
