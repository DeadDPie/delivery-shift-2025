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

import { useReceiverForm } from "../(hooks)/useReceiverForm";

export const ReceiverForm = memo(() => {
    const intl = useI18n();
    const { form, onSubmit } = useReceiverForm();
    const { updateFormData, updateStepValidity, currentStep } = useStep();

    const formValues = form.watch();
    const prevFormValues = useRef(formValues); 

    useEffect(() => {
        if (
            JSON.stringify(prevFormValues.current) !==
            JSON.stringify(formValues)
        ) {
            updateFormData("receiver", formValues);
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
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <I18nText id="page.phone" />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={intl.formatMessage({
                                            id: "page.phone",
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
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <I18nText id="page.profile.form.name" />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={intl.formatMessage({
                                            id: "page.profile.form.name",
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
                        name="middlename"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <I18nText id="page.profile.form.middlename" />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={intl.formatMessage({
                                            id: "page.profile.form.middlename",
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
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <I18nText id="page.profile.form.lastname" />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={intl.formatMessage({
                                            id: "page.profile.form.lastname",
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
