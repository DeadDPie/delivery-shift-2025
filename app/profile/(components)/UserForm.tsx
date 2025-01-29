import { I18nText } from "@/components/shared/I18nText/I18nText";
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@/components/ui";
import { useI18n } from "@/lib/contexts/i18n";

import { useUserForm } from "../(hooks)/useUserForm";

export interface User {
    _id: string;
    phone: string;
    city?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    middlename?: string;
}

interface UserFormProps {
    initialData: User;
}

export const UserForm = ({ initialData }: UserFormProps) => {
    const intl = useI18n();
    const { form, onSubmit } = useUserForm(initialData);

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
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <I18nText id="page.profile.form.email" />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={intl.formatMessage({
                                            id: "page.profile.form.email",
                                        })}
                                        type="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <I18nText id="page.profile.form.city" />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={intl.formatMessage({
                                            id: "page.profile.form.city",
                                        })}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="w-full">
                    <I18nText id="page.profile.form.submit" />
                </Button>
            </form>
        </Form>
    );
};
