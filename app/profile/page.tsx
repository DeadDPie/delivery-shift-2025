import { I18nText } from "@/components/shared/I18nText/I18nText";

import { UserForm } from "./(components)/UserForm";

export default function ProfilePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            <I18nText id="page.profile.title" />
            <UserForm />
        </div>
    );
}
