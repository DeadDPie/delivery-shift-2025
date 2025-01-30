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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    departureCity: z.string().min(1, "Выберите город отправки"),
    destinationCity: z.string().min(1, "Выберите город назначения"),
    packageSize: z.string().min(1, "Выберите размер посылки"),
});

const cities = [
    "Москва",
    "Санкт-Петербург",
    "Казань",
    "Новосибирск",
    "Екатеринбург",
];
const packageSizes = ["Маленький", "Средний", "Большой"];

export function CountDeliveryForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("Форма отправлена:", data);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
            >
                {[
                    {
                        name: "departureCity",
                        label: "Город отправки",
                        options: cities,
                    },
                    {
                        name: "destinationCity",
                        label: "Город назначения",
                        options: cities,
                    },
                    {
                        name: "packageSize",
                        label: "Размер посылки",
                        options: packageSizes,
                    },
                ].map(({ name, label, options }) => (
                    <FormField
                        key={name}
                        control={form.control}
                        name={
                            name as
                                | "departureCity"
                                | "destinationCity"
                                | "packageSize"
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
                                        {options.map((option) => (
                                            <SelectItem
                                                key={option}
                                                value={option}
                                            >
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <Button type="submit" className="w-full">
                    Рассчитать доставку
                </Button>
            </form>
        </Form>
    );
}
