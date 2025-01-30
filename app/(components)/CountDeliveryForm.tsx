"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
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

import { useDeliveryForm } from "../(hooks)/useDeliveryForm";
import { PackageTypesList } from "./PackageTypesList";

export function CountDeliveryForm() {
    const {
        form,
        isLoading,
        deliveryPoints,
        selectedPackage,
        setSelectedPackage,
        onSubmit,
    } = useDeliveryForm();

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="w-2/3 space-y-6">
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
                                        onValueChange={(value) => {
                                            const point = deliveryPoints.find(
                                                (p) => p.id === value
                                            );
                                            if (point) {
                                                field.onChange(point);
                                            }
                                        }}
                                        value={field.value?.id || ""}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={
                                                        name === "departureCity"
                                                            ? "Выберите пункт отправки"
                                                            : "Выберите пункт назначения"
                                                    }
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {deliveryPoints.map((point) => (
                                                <SelectItem
                                                    key={point.id}
                                                    value={point.id}
                                                >
                                                    {point.name}
                                                </SelectItem>
                                            ))}
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
                                        {selectedPackage.name ||
                                            "Выберите размер посылки"}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="right"
                                    align="start"
                                    className="max-h-[300px] w-[400px] fixed overflow-auto"
                                >
                                    <PackageTypesList
                                        setSelectedPackage={(packageType) => {
                                            setSelectedPackage(packageType);
                                            field.onChange(packageType.name);
                                        }}
                                    />
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
