import { UserForm } from "./(components)/UserForm";

export default function ProfilePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            <h1>Профиль</h1>
            <UserForm />
        </div>
    );
}
