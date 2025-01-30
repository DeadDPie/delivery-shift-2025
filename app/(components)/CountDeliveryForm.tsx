"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DeliveryPoint } from "@/lib/api/requests";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useDeliveryPointsQuery } from "../(hooks)/useDeliveryPointsQuery ";

const FormSchema = z.object({
    departureCity: z.string().min(1, "Выберите пункт отправки"),
    destinationCity: z.string().min(1, "Выберите пункт назначения"),
    packageSize: z.string().min(1, "Выберите размер посылки"),
});

const packageSizes = ["Маленький", "Средний", "Большой"];

export function CountDeliveryForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const { data: deliveryResponse, isLoading } = useDeliveryPointsQuery();
    const deliveryPoints = deliveryResponse?.data?.points || [];

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("Форма отправлена:", data);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
            >
                {isLoading ? (
                    <p>Загрузка пунктов выдачи...</p>
                ) : (
                    <>
                        {[
                            {
                                name: "departureCity",
                                label: "Пункт отправки",
                                options: deliveryPoints,
                            },
                            {
                                name: "destinationCity",
                                label: "Пункт назначения",
                                options: deliveryPoints,
                            },
                        ].map(({ name, label, options }) => (
                            <FormField
                                key={name}
                                control={form.control}
                                name={
                                    name as "departureCity" | "destinationCity"
                                }
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{label}</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={`Выберите ${label.toLowerCase()}`}
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {options.map(
                                                    (option: DeliveryPoint) => (
                                                        <SelectItem
                                                            key={option.id}
                                                            value={option.name}
                                                        >
                                                            {option.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </>
                )}
                <FormField
                    control={form.control}
                    name="packageSize"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Размер посылки</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Выберите размер" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {packageSizes.map((size) => (
                                        <SelectItem key={size} value={size}>
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Рассчитать доставку
                </Button>
            </form>
        </Form>
    );
}
