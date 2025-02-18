import * as z from "zod";

export const senderAddressSchema = z.object({
    street: z.string().min(1, "Укажите улицу"),
    house: z.string().min(1, "Укажите дом"),
    apartment: z.string().min(1, "Укажите квартиру"),
    comment: z.string().optional(),
});
