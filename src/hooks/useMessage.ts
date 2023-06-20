import { Message, messages } from "../data/messages";

const useMessage = () => {
    const getAllMessage = () => messages;

    const findMessageWithId = (id: string) =>
        messages.find((mess) => mess.messageID === id);

    const findMessages = (senderId: string, receiverID: string) =>
        messages.filter(
            (mess) =>
                mess.senderID === senderId && mess.receiverID === receiverID,
        );

    const findMessagesOfSender = (senderId: string) => {
        const result: Record<string, Message[]> = {};
        messages.forEach((mess) => {
            if (mess.senderID === senderId) {
                if (result[mess.receiverID]) {
                    result[mess.receiverID].push(mess);
                } else {
                    result[mess.receiverID] = [mess];
                }
            }

            if (mess.receiverID === senderId) {
                if (result[mess.senderID]) {
                    result[mess.senderID].push(mess);
                } else {
                    result[mess.senderID] = [mess];
                }
            }
        });
        return result;
    };

    const findMessagesOfSenderWithReceiver = (senderId: string, receiverID: string) => {
        return findMessagesOfSender(senderId)[receiverID];
    }

    return {
        getAllMessage,
        findMessageWithId,
        findMessages,
        findMessagesOfSender,
        findMessagesOfSenderWithReceiver,
    };
};

export default useMessage;
