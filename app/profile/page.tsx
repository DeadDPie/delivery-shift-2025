"use client";

import { I18nText } from "@/components/shared/I18nText/I18nText";

import { UserForm } from "./(components)/UserForm";
import { useSessionQuery } from "./(hooks)/useSessionQuery";

export default function ProfilePage() {
    const { data, isLoading, isError, error } = useSessionQuery();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-6">
                <I18nText id="page.profile.loading" />
                <div className="w-full max-w-md bg-gray-200 animate-pulse h-96 rounded-lg" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-6">
                <I18nText
                    id="page.profile.error"
                    values={{ error: error?.message || "Неизвестная ошибка" }}
                />
            </div>
        );
    }

    const userData = data?.data?.user;

    if (!userData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-6">
                <I18nText
                    id="page.profile.error"
                    values={{ error: "Данные пользователя не найдены" }}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            <I18nText id="page.profile.title" />
            <UserForm initialData={userData} />
        </div>
    );
}
