import { z } from "zod";

export const DeliveryFormSchema = z.object({
    departureCity: z
        .object({
            id: z.string(),
            name: z.string(),
            latitude: z.number(),
            longitude: z.number(),
        })
        .nullable()
        .refine((val) => val !== null, {
            message: "Выберите пункт отправки",
        }),
    destinationCity: z
        .object({
            id: z.string(),
            name: z.string(),
            latitude: z.number(),
            longitude: z.number(),
        })
        .nullable()
        .refine((val) => val !== null, {
            message: "Выберите пункт назначения",
        }),
    packageSize: z.string().min(1, "Выберите размер посылки"),
});

export type DeliveryFormData = z.infer<typeof DeliveryFormSchema>;
