"use client";

import { I18nText } from "@/components/shared/I18nText/I18nText";
import {
    Button,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@/components/ui";
import { useI18n } from "@/lib/contexts/i18n";

import { useAuthForm } from "../(hooks)/useAuthForm";

export const AuthForm = () => {
    const { form, isOtpStage, onSubmit } = useAuthForm();
    const intl = useI18n();

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-8">
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <I18nText id="page.auth.loginForm.title" />
                            </FormLabel>
                            <FormDescription>
                                <I18nText id="page.auth.loginForm.description.phone" />
                            </FormDescription>
                            <FormControl>
                                <Input
                                    placeholder={intl.formatMessage({
                                        id: "page.phone",
                                    })}
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(
                                            e.target.value.replace(/\s+/g, "")
                                        );
                                    }}
                                />
                            </FormControl>
                            <FormMessage>
                                <I18nText id="page.auth.loginForm.error.phone" />
                            </FormMessage>
                        </FormItem>
                    )}
                />

                {isOtpStage && (
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder={intl.formatMessage({
                                            id: "page.auth.loginForm.placeholder.otp",
                                        })}
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(
                                                e.target.value.replace(
                                                    /\s+/g,
                                                    ""
                                                )
                                            );
                                        }}
                                    />
                                </FormControl>
                                <FormMessage>
                                    <I18nText id="page.auth.loginForm.error.otp" />
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                )}

                <Button type="submit">
                    {isOtpStage ? (
                        <I18nText id="page.auth.loginForm.button.login" />
                    ) : (
                        <I18nText id="page.auth.loginForm.button.continue" />
                    )}
                </Button>
            </form>
        </Form>
    );
};
