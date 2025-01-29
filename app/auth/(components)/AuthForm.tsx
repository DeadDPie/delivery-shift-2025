"use client";

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

import { useAuthForm } from "../(hooks)/useAuthForm";

export const AuthForm = () => {
    const { form, isOtpStage, onSubmit } = useAuthForm();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Авторизация</FormLabel>
                            <FormDescription>
                                Введите номер телефона для входа в личный
                                кабинет
                            </FormDescription>
                            <FormControl>
                                <Input placeholder="Телефон" {...field} />
                            </FormControl>
                            <FormMessage />
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
                                        placeholder="Проверочный код"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <Button type="submit">
                    {isOtpStage ? "Войти" : "Продолжить"}{" "}
                </Button>
            </form>
        </Form>
    );
};
