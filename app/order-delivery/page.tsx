import Stepper from "./(components)/Stepper";

export default function OrderDeliveryPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Stepper totalSteps={7} />
        </div>
    );
}
