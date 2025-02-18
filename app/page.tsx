import { CountDeliveryForm } from "./(components)/CountDeliveryForm";

export default function Home() {
    return (
        <div className="flex flex-col max-w-screen-md items-center justify-center min-h-screen gap-6">
            <CountDeliveryForm />
        </div>
    );
}
