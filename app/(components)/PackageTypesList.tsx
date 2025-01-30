"use client";

import { Button, Input, Label } from "@/components/ui";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { useState } from "react";

import { usePackageTypesQuery } from "../(hooks)/usePackageTypesQuery";

export function PackageTypesList({ setSelectedPackage }: any) {
    const { data: packageTypesResponse, isLoading } = usePackageTypesQuery();
    const [selectedToggleValue, setSelectedToggleValue] = useState<
        string | undefined
    >(undefined);

    if (isLoading) {
        return <p>Загрузка типов посылок...</p>;
    }

    const packageTypes = packageTypesResponse?.data?.packages || [];

    return (
        <div>
            <ToggleGroup
                type="single"
                value={selectedToggleValue}
                onValueChange={(value) => setSelectedToggleValue(value)} // Update state on toggle change
            >
                <ToggleGroupItem
                    value="approximate"
                    aria-label="Toggle approximate"
                >
                    Примерные
                </ToggleGroupItem>
                <ToggleGroupItem value="exact" aria-label="Toggle exact">
                    Точные
                </ToggleGroupItem>
            </ToggleGroup>
            {selectedToggleValue === "approximate" && (
                <ul>
                    {packageTypes.map((packageType) => (
                        <li
                            onClick={() => setSelectedPackage(packageType.name)}
                            key={packageType.id}
                            className="cursor-pointer border p-2 m-2"
                        >
                            <strong>{packageType.name}</strong>
                            <p>
                                Размер: {packageType.length} x{" "}
                                {packageType.width} x {packageType.height} см
                            </p>
                            <p>Вес: {packageType.weight} кг</p>
                        </li>
                    ))}
                </ul>
            )}

            {selectedToggleValue === "exact" && (
                <div>
                    <form className="space-y-4 max-w-md mx-auto">
                        <div className="flex items-center space-x-4">
                            <Label
                                htmlFor="length"
                                className="w-1/3 text-right"
                            >
                                Длина:
                            </Label>
                            <Input
                                id="length"
                                type="number"
                                placeholder="Введите длину"
                                className="w-2/3"
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            <Label htmlFor="width" className="w-1/3 text-right">
                                Ширина:
                            </Label>
                            <Input
                                id="width"
                                type="number"
                                placeholder="Введите ширину"
                                className="w-2/3"
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            <Label
                                htmlFor="height"
                                className="w-1/3 text-right"
                            >
                                Высота:
                            </Label>
                            <Input
                                id="height"
                                type="number"
                                placeholder="Введите высоту"
                                className="w-2/3"
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            <Label
                                htmlFor="weight"
                                className="w-1/3 text-right"
                            >
                                Вес:
                            </Label>
                            <Input
                                id="weight"
                                type="number"
                                placeholder="Введите вес"
                                className="w-2/3"
                            />
                        </div>
                        <Button
                            type="button"
                            onClick={() => setSelectedPackage("Свой размер")}
                        >
                            Подтвердить
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
}
