"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pencil } from "lucide-react";

interface OrderCardProps {
    title: string;
    fields: { label: string; value: string }[];
    onEdit?: () => void;
}

export const OrderCard = ({ title, fields, onEdit }: OrderCardProps) => {
    return (
        <Card>
            <CardContent>
                <div className="grid grid-cols-4 gap-x-8 gap-y-2 mt-4">
                    <div className="flex justify-between items-center">
                        <div className="text-gray-600">{title}</div>
                    </div>
                    {fields.map(({ label, value }, index) => (
                        <div key={index}>
                            <div className="text-sm text-gray-500">{label}</div>
                            <div>{value}</div>
                        </div>
                    ))}
                    {onEdit && (
                        <button
                            className="text-gray-400 hover:text-gray-600"
                            onClick={onEdit}
                        >
                            <Pencil className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
