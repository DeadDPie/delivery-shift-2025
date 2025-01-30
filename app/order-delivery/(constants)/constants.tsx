import { OptionForm } from "../(components)/OptionForm";
import { Overview } from "../(components)/Overview";

export const ORDER_DELIVERY_STAGES = {
    option: OptionForm,
    receiver: () => <div>Форма получателя</div>,
    sender: () => <div>Форма отправителя</div>,
    senderAddress: () => <div>Адрес отправителя</div>,
    receiverAddress: () => <div>Адрес получателя</div>,
    payer: () => <div>Плательщик</div>,
    overview: Overview,
};
