import { useMutation } from '@tanstack/react-query'

import { PostDeliveryCalcRequestConfig, postDeliveryCalc } from '@/lib/api/requests'


export const usePostDeliveryCalcMutation = (
  settings?: MutationSettings<PostDeliveryCalcRequestConfig, typeof postDeliveryCalc>
) =>
  useMutation({
    mutationKey: ['postDeliveryCalc'],
    mutationFn: ({ params, config }) =>
    postDeliveryCalc({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  })
