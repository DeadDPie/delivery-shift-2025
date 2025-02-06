"use client";

import { usePostDeliveryOrderMutation } from "@/app/(hooks)/usePostDeliveryOrderMutation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PostDeliveryOrderParams } from "@/lib/api/requests";
import { ROUTES } from "@/lib/constants/routes";
import { useStep } from "@/lib/contexts/StepContext";
import useDeliveryStore from "@/lib/store/deliveryStore";
import useOrderStore, { OrderData } from "@/lib/store/orderStore";
import { useRouter } from "next/navigation";

const Stepper = () => {
    const router = useRouter();

    const {
        currentStep,
        totalSteps,
        goNext,
        goBack,
        isLastStep,
        isStepValid,
        formData,
    } = useStep();
    const { data, clearData } = useDeliveryStore();
    const { setData } = useOrderStore();

    const postDeliveryOrder = usePostDeliveryOrderMutation();

    const handleSubmit = () => {
        const updatedFormData: PostDeliveryOrderParams = {
            senderPoint: data.params?.senderPoint || formData.senderPoint,
            receiverPoint: data.params?.receiverPoint || formData.receiverPoint,
            sender: formData.sender,
            senderAddress: formData.senderAddress,
            receiver: formData.receiver,
            receiverAddress: formData.receiverAddress,
            payer: formData.payer,
            option: formData.option,
        };

        postDeliveryOrder.mutate(
            {
                params: updatedFormData,
            },
            {
                onSuccess: (response) => {
                    console.log("Отправка данных:", response);

                    const orderData: OrderData = {
                        data: {
                            success: response.data.success,
                            order: {
                                senderPoint: response.data.order.senderPoint,
                                senderAddress: {
                                    street: response.data.order.senderAddress
                                        .street,
                                    house: response.data.order.senderAddress
                                        .house,
                                    apartment:
                                        response.data.order.senderAddress
                                            .apartment,
                                    comment:
                                        response.data.order.senderAddress
                                            .comment || "", // Если comment undefined, используем пустую строку
                                },
                                sender: response.data.order.sender,
                                receiverPoint:
                                    response.data.order.receiverPoint,
                                receiverAddress: {
                                    street: response.data.order.receiverAddress
                                        .street,
                                    house: response.data.order.receiverAddress
                                        .house,
                                    apartment:
                                        response.data.order.receiverAddress
                                            .apartment,
                                    comment:
                                        response.data.order.receiverAddress
                                            .comment || "", // Если comment undefined, используем пустую строку
                                },
                                receiver: response.data.order.receiver,
                                payer: response.data.order.payer,
                                status: response.data.order.status,
                                cancellable: response.data.order.cancellable,
                                _id: response.data.order._id,
                                created: response.data.order.created,
                                updated: response.data.order.updated,
                            },
                        },
                        status: response.status,
                        statusText: response.statusText,
                        headers: {
                            "content-length":
                                response.headers["content-length"],
                            "content-type": response.headers["content-type"],
                        },
                        config: {
                            timeout: response.config.timeout,
                            xsrfCookieName: response.config.xsrfCookieName,
                            xsrfHeaderName: response.config.xsrfHeaderName,
                            maxContentLength: response.config.maxContentLength,
                            maxBodyLength: response.config.maxBodyLength,
                            env: response.config.env,

                            baseURL: response.config.baseURL,
                            method: response.config.method,
                            url: response.config.url,
                            data: response.config.data,
                        },
                        request: response.request,
                    };

                    setData(orderData);
                    router.push(ROUTES.RESULT_ORDER);
                },
                onError: (error) => {
                    console.error("Ошибка при отправка данных:", error);
                },
            }
        );
        console.log("Отправка данных:", updatedFormData);

        clearData();
    };

    const handleNext = () => {
        if (isLastStep) {
            handleSubmit();
        } else {
            goNext();
        }
    };

    const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="w-full max-w-md mx-auto mt-10">
            <div className="text-center mb-4">
                <p className="text-lg font-semibold">
                    Шаг {currentStep + 1} из {totalSteps}
                </p>
            </div>

            <Progress value={progressPercentage} className="h-4 bg-gray-200" />

            <div className="flex justify-between mt-4">
                <Button onClick={goBack} disabled={currentStep === 0}>
                    Назад
                </Button>
                <Button onClick={handleNext} disabled={!isStepValid}>
                    {isLastStep ? "Отправить" : "Вперед"}
                </Button>
            </div>
        </div>
    );
};

export default Stepper;
