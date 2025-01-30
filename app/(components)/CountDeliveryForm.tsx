"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DeliveryPoint } from "@/lib/api/requests";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState } from "react";

import { useDeliveryPointsQuery } from "../(hooks)/useDeliveryPointsQuery ";
import { PackageTypesList } from "./PackageTypesList";

const FormSchema = z.object({
    departureCity: z.string().min(1, "Выберите пункт отправки"),
    destinationCity: z.string().min(1, "Выберите пункт назначения"),
    packageSize: z.string().min(1, "Выберите размер посылки"),
});

export function CountDeliveryForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { packageSize: "" },
    });

    const packageTypes = [
        {
            id: "1",
            name: "Конверт",
            length: 42,
            width: 36,
            height: 5,
            weight: 2,
        },
        {
            id: "2",
            name: "Короб S",
            length: 23,
            width: 19,
            height: 10,
            weight: 2,
        },
        {
            id: "3",
            name: "Короб M",
            length: 33,
            width: 25,
            height: 15,
            weight: 5,
        },
    ];

    const { data: deliveryResponse, isLoading } = useDeliveryPointsQuery();
    const deliveryPoints = deliveryResponse?.data?.points || [];
    const [selectedPackage, setSelectedPackage] = useState<string>("");
    const [selectedToggleValue, setSelectedToggleValue] = useState<string>("");

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
                    ["departureCity", "destinationCity"].map((name) => (
                        <FormField
                            key={name}
                            control={form.control}
                            name={name as "departureCity" | "destinationCity"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {name === "departureCity"
                                            ? "Пункт отправки"
                                            : "Пункт назначения"}
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Выберите пункт" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {deliveryPoints.map(
                                                (point: DeliveryPoint) => (
                                                    <SelectItem
                                                        key={point.id}
                                                        value={point.name}
                                                    >
                                                        {point.name}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))
                )}

                <FormField
                    control={form.control}
                    name="packageSize"
                    render={({ field }) => (
                        <FormItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        {selectedPackage ||
                                            "Выберите размер посылки"}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="right"
                                    align="start"
                                    className="max-h-[300px] w-[400px] fixed  overflow-auto"
                                >
                                    <PackageTypesList />
                                </DropdownMenuContent>
                            </DropdownMenu>
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
