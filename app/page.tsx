import { CountDeliveryForm } from "./(components)/CountDeliveryForm";
import { PackageTypesList } from "./(components)/PackageTypesList";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            <CountDeliveryForm />
        </div>
    );
}
