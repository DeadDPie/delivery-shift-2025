"use client";

import { IntlProvider } from "react-intl";

import React from "react";

import { getMessagesByLocale } from "./helpers/getMessagesByLocale";

interface I18nProviderProps {
    children: React.ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
    const locale = "ru";
    const messages = getMessagesByLocale(locale);

    return (
        <IntlProvider locale={locale} defaultLocale="ru" messages={messages}>
            {children}
        </IntlProvider>
    );
};
