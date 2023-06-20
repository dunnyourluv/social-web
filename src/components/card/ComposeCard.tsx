import {
    CameraOutlined,
    CloseCircleOutlined,
    EditOutlined,
    FileImageOutlined,
    PlusCircleOutlined,
    SmileOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import Box from "../primarys/Box";
import User from "../Users/User";
import { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";

function CardTab({
    children,
    icon,
    isActive,
    onClick,
}: {
    children?: JSX.Element;
    icon?: JSX.Element;
    isActive?: boolean;
    onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
}) {
    return (
        <li
            className={`${
                isActive
                    ? "border-gray-bold/40 border border-b-white bg-white dark:bg-dark-bold dark:border-b-dark-bold"
                    : "text-gray-bold border-b-gray-bold/40 border-b hover:bg-gray-light dark:hover:bg-dark-light"
            } dark:text-gray-bold flex-1 flex text-sm items-center py-3 justify-center cursor-pointer transition select-none`}
            onClick={onClick}
        >
            {icon && (
                <div className="text-lg flex justify-center items-center">
                    {icon}
                </div>
            )}
            {children && <div className="pl-2">{children}</div>}
        </li>
    );
}

function ComposeOption({
    children,
    icon,
}: {
    children?: JSX.Element;
    icon?: JSX.Element;
}) {
    return (
        <li className="flex justify-center items-center bg-gray-light dark:bg-dark-light dark:text-gray-bold ml-2 rounded-full p-2 text-gray-bold cursor-pointer hover:bg-gray-bold/20 dark:hover:bg-black-bold transition">
            {icon && (
                <div className="flex justify-center items-center">{icon}</div>
            )}
            {children && (
                <div className="ml-2 text-sm text-black-bold dark:text-gray-bold">
                    {children}
                </div>
            )}
        </li>
    );
}

function ComposeButton({
    onClick,
    children,
    disabled,
}: {
    children: JSX.Element;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
    return (
        <button
            className={`
    ${disabled ? "bg-blue-light/50 cursor-not-allowed" : "bg-blue-light"}
    text-white font-semibold w-full rounded-md py-3 text-xs
    `}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

function ComposeCard(props: { onPublish?: (content: string) => void }) {
    const [toggle, setToggle] = useState(false);
    const [content, setContent] = useState("");
    const { getUser } = useAuth();
    const user = getUser();
    return (
        <Box active={toggle}>
            <>
                <div className="bg-gray-light/40 mb-6 dark:bg-dark-bold">
                    <ul className="flex">
                        <CardTab icon={<EditOutlined />} isActive>
                            <p>Publish</p>
                        </CardTab>
                        <CardTab icon={<FileImageOutlined />}>
                            <p>Images</p>
                        </CardTab>
                        <CardTab icon={<VideoCameraOutlined />}>
                            <p>Videos</p>
                        </CardTab>
                        {toggle && (
                            <CardTab
                                icon={<CloseCircleOutlined />}
                                onClick={() => {
                                    setToggle(false);
                                }}
                            ></CardTab>
                        )}
                    </ul>
                </div>
                <div className="flex px-2 ">
                    <div className="">
                        <User
                            description=" "
                            src={user?.avatar || " "}
                            disabledHover
                            type="button"
                            name=" "
                        />
                    </div>
                    <textarea
                        value={content}
                        onClick={(e) => {
                            setToggle(true);
                        }}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        className="flex-1 h-36 outline-none resize-none p-2 dark:bg-dark-light rounded-md dark:text-white"
                        placeholder="write something here"
                    />
                </div>
                <ul className="flex py-2 mt-2 border-t border-t-gray-bold/40">
                    <ComposeOption icon={<CameraOutlined />}>
                        <span>Media</span>
                    </ComposeOption>
                    <ComposeOption icon={<SmileOutlined />}>
                        <span>Activity</span>
                    </ComposeOption>
                    <ComposeOption
                        icon={<PlusCircleOutlined />}
                    ></ComposeOption>
                </ul>
                {toggle && (
                    <div className="m-1">
                        <ComposeButton
                            onClick={() => {
                                props.onPublish && props.onPublish(content);
                                setContent("");
                            }}
                            disabled={content.length === 0}
                        >
                            <span>Publish</span>
                        </ComposeButton>
                    </div>
                )}
            </>
        </Box>
    );
}

export default ComposeCard;
