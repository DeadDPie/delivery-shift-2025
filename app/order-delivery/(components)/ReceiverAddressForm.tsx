"use client";

import { I18nText } from "@/components/shared/I18nText/I18nText";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@/components/ui";
import { useStep } from "@/lib/contexts/StepContext";
import { useI18n } from "@/lib/contexts/i18n";

import { memo, useEffect, useRef } from "react";

import { useReceiverAddressForm } from "../(hooks)/useReceiverAddressForm";

export const ReceiverAddressForm = memo(() => {
    const intl = useI18n();
    const { form, onSubmit } = useReceiverAddressForm();
    const { updateFormData, updateStepValidity, currentStep } = useStep();

    const formValues = form.watch();
    const prevFormValues = useRef(formValues);

    useEffect(() => {
        if (
            JSON.stringify(prevFormValues.current) !==
            JSON.stringify(formValues)
        ) {
            updateFormData("receiverAddress", formValues);
            prevFormValues.current = formValues;
        }

        updateStepValidity(currentStep, form.formState.isValid);
    }, [
        formValues,
        form.formState.isValid,
        currentStep,
        updateFormData,
        updateStepValidity,
    ]);

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <I18nText id="page.street" />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={intl.formatMessage({
                                            id: "page.street",
                                        })}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="house"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <I18nText id="page.house" />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={intl.formatMessage({
                                            id: "page.house",
                                        })}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="apartment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <I18nText id="page.apartment" />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={intl.formatMessage({
                                            id: "page.apartment",
                                        })}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <I18nText id="page.comment" />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={intl.formatMessage({
                                            id: "page.comment",
                                        })}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
});
