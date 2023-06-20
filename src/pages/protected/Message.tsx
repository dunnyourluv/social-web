import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import useMessage from "../../hooks/useMessage";
import useUser from "../../hooks/useUser";
import { UserInfo } from "../../data/users";
import { Message } from "../../data/messages";
import User from "../../components/Users/User";
import {
    BarChartOutlined,
    CloseOutlined,
    EyeInvisibleOutlined,
    FundOutlined,
    MoreOutlined,
    PlusCircleOutlined,
    SearchOutlined,
    SendOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { InfoItem } from "./Profile";

interface Conversation {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    lastMessageTime: number;
    unreadMessage: number;
    isOnline: boolean;
}

const MessageContext = createContext<{
    user?: UserInfo | null;
}>({});

const ConversationItem = (props: {
    conversation: Conversation;
    activated?: boolean;
    onClick?: () => void;
}) => {
    return (
        <div
            className={`p-2 select-none dark:text-gray-light hover:bg-gray-bold/30 rounded-md transition duration-200 ${
                (props.activated && "bg-blue-bold/30") || ""
            } ${(props.onClick && "cursor-pointer") || ""}`}
            onClick={props.onClick}
        >
            <div className="flex justify-center items-center md:justify-normal">
                <div className="">
                    <img
                        src={props.conversation.avatar}
                        alt={props.conversation.lastMessage}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                </div>
                <div className="hidden md:block ml-2 px-1">
                    <div className="text-sm font-bold">
                        {props.conversation.name}
                    </div>
                    <div className="text-xs">
                        {props.conversation.lastMessage}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MessageSidebar = (props: { className?: string }) => {
    const { getUser } = useAuth();
    const { getUserById } = useUser();
    const { findMessagesOfSender } = useMessage();
    const [conversation, setConversation] = useState<Conversation[]>([]);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const user = getUser();
        if (user) {
            const data = findMessagesOfSender(user.id);
            const converse: Conversation[] = [];
            for (let key in data) {
                const user = getUserById(key);
                const lastMessage = data[key][data[key].length - 1];
                converse.push({
                    id: key,
                    name: user?.name || "",
                    avatar: user?.avatar || "",
                    lastMessage: lastMessage.message,
                    isOnline: true,
                    lastMessageTime: lastMessage.timestamp,
                    unreadMessage: 0,
                });
            }

            setConversation(converse);
        }
    }, []);

    return (
        <div className={`p-1 ${(props.className && props.className) || ""}`}>
            <h1 className="hidden md:block text-2xl font-bold dark:text-gray-bold">Chat</h1>
            <div className="hidden md:flex my-2 ">
                <div className="px-2 h-9 overflow-hidden flex justify-center items-center rounded-full border border-gray-bold/30">
                    <div className="h-9 w-9 flex justify-center items-center dark:text-gray-bold">
                        <SearchOutlined />
                    </div>
                    <input
                        type="text"
                        className="flex-1 outline-none w-full rounded-md px-1 dark:bg-dark-light dark:text-gray-bold"
                        placeholder="Search"
                    />
                </div>
            </div>
            {conversation.map((item) => (
                <ConversationItem
                    conversation={item}
                    activated={id === item.id}
                    key={item.id}
                    onClick={() => {
                        navigate(`/messages/${item.id}`);
                    }}
                />
            ))}
        </div>
    );
};

const MessageContentHeader = (props: {
    avatar: string;
    name: string;
    isOnline: boolean;
    moreOutClick?: () => void;
}) => {
    return (
        <div className="py-1 flex">
            <div className="">
                <User
                    description={
                        (props.isOnline && "Active") || "Active two minutes ago"
                    }
                    src={props.avatar}
                    name={props.name}
                    disabledHover
                />
            </div>
            <div className="text-2xl text-black-light ml-auto flex justify-center items-center">
                <SettingOutlined className="mr-2 cursor-pointer duration-200 transition hover:text-black-bold" />
                <MoreOutlined
                    onClick={props.moreOutClick}
                    className="ml-2 mr-2 cursor-pointer duration-200 transition hover:text-black-bold"
                />
            </div>
        </div>
    );
};

const MessageChat = (props: { message: Message; noTitle?: boolean }) => {
    const { user } = useContext(MessageContext);
    const { getUserById } = useUser();
    const [sender, setSender] = useState<UserInfo | null>(null);
    useEffect(() => {
        if (user) {
            const senderInfo = getUserById(props.message.senderID);
            if (senderInfo) setSender(senderInfo);
        }
    }, [props.message.senderID]);
    if (!sender) return <></>;
    return (
        <div
            className={`flex ${
                props.message.senderID === user?.id ? "flex-row-reverse" : ""
            }`}
        >
            <div
                className={`flex items-end ${
                    props.noTitle ? "invisible" : "visible"
                }`}
            >
                <img
                    src={sender.avatar}
                    alt={sender.name}
                    className="w-10 h-10 rounded-full object-cover"
                />
            </div>
            <div className="mx-2 mb-1">
                <div
                    className={`text-sm text-gray-bold ${
                        props.noTitle ? "hidden" : "block"
                    } ${
                        props.message.senderID === user?.id ? "text-right" : ""
                    }`}
                >
                    {sender.name}
                </div>
                <div
                    className={`${
                        props.message.senderID === user?.id
                            ? "bg-blue-light"
                            : "bg-gray-bold/80 dark:bg-dark-bold/20"
                    } text-white p-2 rounded-md`}
                >
                    {props.message.message}
                </div>
            </div>
        </div>
    );
};

const MessageChatInput = (props: {onSend?: (content: string) => void}) => {
    const [content, setContent] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);
    return (
        <div className="h-full w-full flex items-center p-2">
            <div className="flex justify-center items-center">
                <button className="h-9 w-9 flex justify-center items-center text-xl bg-blue-light text-white mr-1 rounded-md">
                    <PlusCircleOutlined />
                </button>
            </div>
            <textarea value={content} ref={inputRef} onChange={(e) => {
                setContent(e.target.value);
            }} className="resize-none p-1 flex-1 h-9 outline-none dark:text-gray-light bg-black-light/20 rounded-l-md" />
            <button onClick={() => {
                if(props.onSend) {
                    props.onSend(content);
                    setContent("");
                    inputRef.current?.focus();
                }
            }} className=" p-1 flex items-center rounded-r-md justify-center h-9 w-9 bg-blue-light text-white">
                <SendOutlined className="" />
            </button>
        </div>
    );
};

const MessageInfo = (props: { className?: string; onClose?: () => void }) => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const { getUserById } = useUser();
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            const userInfo = getUserById(id);
            if (userInfo) setUser(userInfo);
        }
    }, [id]);
    if (!user) return <></>;
    return (
        <div className="">
            <div className="flex p-2 border-b border-b-gray-bold/20 select-none dark:text-gray-light">
                <h3 className="text-lg font-bold">Details</h3>
                <button
                    className="flex text-lg justify-center items-center ml-auto"
                    onClick={props.onClose}
                >
                    <CloseOutlined className="w-full" />
                </button>
            </div>
            <div className="flex text-center justify-center mt-6 items-center flex-wrap">
                <img
                    src={user.avatar}
                    className="w-20 h-20 rounded-full object-cover"
                    alt={user.username}
                />
                <h5 className="w-full font-bold text-lg dark:text-gray-light">{user.name}</h5>
                <p className="w-full text-gray-bold text-sm">
                    @{user.username}
                </p>
            </div>
            <div className="flex justify-center items-center text-2xl my-2">
                <Link
                    className="dark:text-gray-light mx-1 p-1 w-12 h-12 rounded-full flex justify-center items-center hover:bg-gray-bold/30 transition duration-200"
                    to={`/profile/${user.id}`}
                >
                    <UserOutlined />
                </Link>
                <button className="dark:text-gray-light mx-1 p-1 w-12 h-12 rounded-full flex justify-center items-center hover:bg-gray-bold/30 transition duration-200">
                    <EyeInvisibleOutlined />
                </button>
                <button className="dark:text-gray-light mx-1 p-1 w-12 h-12 rounded-full flex justify-center items-center hover:bg-gray-bold/30 transition duration-200">
                    <SearchOutlined />
                </button>
            </div>
            <div className="p-2 border-b border-b-gray-bold/20">
                <h3 className="text-lg font-bold dark:text-gray-light">About Me</h3>
            </div>
            <ul className="p-2">
                <div className="border border-gray-bold/30 rounded-md mb-2">
                    <InfoItem
                        icon={<BarChartOutlined />}
                        title="Work at"
                        label="Da nang"
                    />
                </div>
                <div className="border border-gray-bold/30 rounded-md mb-2">
                    <InfoItem
                        icon={<FundOutlined />}
                        title="Study at"
                        label="Viet Han Korean University"
                    />
                </div>
            </ul>
        </div>
    );
};

const MessageContent = (props: { className?: string }) => {
    const { id } = useParams();
    const { user } = useContext(MessageContext);
    const { getUserById } = useUser();
    const { findMessagesOfSenderWithReceiver } = useMessage();
    const [messages, setMessages] = useState<Message[]>([]);
    const [receiver, setReceiver] = useState<UserInfo | null>(null);
    const [openInfo, setOpenInfo] = useState(false);
    useEffect(() => {
        if (user && id) {
            const data = findMessagesOfSenderWithReceiver(user.id, id);
            setMessages(data);
            const receiverInfo = getUserById(id);
            if (receiverInfo) setReceiver(receiverInfo);
        }
    }, [id]);
    if (!id)
        return (
            <div
                className="flex w-full justify-center items-center dark:bg-dark-light dark:text-gray-bold"
                style={{
                    height: "calc(100vh - 3.5rem)",
                }}
            >
                <h1 className="text-xl text-center font-bold">
                    Select a chat or start a new one!
                </h1>
            </div>
        );
    return (
        <div
            className={`relative flex flex-col ${
                (props.className && props.className) || ""
            }`}
            style={{
                height: "calc(100vh - 3.5rem)",
            }}
        >
            <div className="h-14 absolute border-b border-b-gray-bold/30 bg-white dark:bg-dark-light right-0 left-0 top-0">
                <MessageContentHeader
                    avatar={receiver?.avatar || ""}
                    name={receiver?.name || ""}
                    isOnline={true}
                    moreOutClick={() => {
                        setOpenInfo(true);
                    }}
                />
            </div>
            <div className={`absolute z-[11] bg-white dark:bg-dark-light right-0 left-0 bottom-0 top-0 duration-200 transition ${openInfo && "translate-x-0" || "translate-x-full"}`}>
                <MessageInfo onClose={() => {
                    setOpenInfo(false);
                }} />
            </div>
            <div className="overflow-auto py-16 px-1 h-full dark:bg-dark-light">
                {messages.map((item, index) => (
                    <MessageChat
                        message={item}
                        noTitle={
                            index !== 0 &&
                            messages[index - 1].senderID === item.senderID
                        }
                        key={item.messageID}
                    />
                ))}
            </div>
            <div className="absolute h-14 bottom-0 right-0 left-0 bg-white dark:bg-dark-light">
                {<MessageChatInput />}
            </div>
        </div>
    );
};

const MessagePage = () => {
    const { getUser } = useAuth();
    const user = getUser();
    useEffect(() => {
        document.title = "Solve4X | Messages";
    }, []);
    return (
        <MessageContext.Provider value={{ user: user }}>
            <div className="flex fixed w-full h-full">
                <div className="w-2/12 md:w-3/12 lg:w-2/12 bg-white dark:bg-dark-light border-r border-r-gray-bold/30 overflow-auto">
                    <MessageSidebar />
                </div>
                <div className="w-10/12 md:w-9/12 lg:w-10/12">
                    <MessageContent className="" />
                </div>
            </div>
        </MessageContext.Provider>
    );
};

export default MessagePage;
