import { OptionForm } from "../(components)/OptionForm";
import { Overview } from "../(components)/Overview";
import { ReceiverForm } from "../(components)/ReceiverForm";
import { SenderAddressForm } from "../(components)/SenderAddressForm";
import { SenderForm } from "../(components)/SenderForm";

export const ORDER_DELIVERY_STAGES = {
    option: OptionForm,
    receiver: ReceiverForm,
    sender: SenderForm,
    senderAddress: SenderAddressForm,
    receiverAddress: Overview,
    payer: () => <div>Плательщик</div>,
    overview: Overview,
};
