import * as z from "zod";

export const receiverAddressSchema = z.object({
    street: z.string().min(1, "Укажите улицу"),
    house: z.string().min(1, "Укажите дом"),
    apartment: z.string().optional(),
    comment: z.string().optional(),
});
